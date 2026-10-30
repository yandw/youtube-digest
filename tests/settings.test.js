const test = require("node:test");
const assert = require("node:assert/strict");

const settings = require("../settings.js");

test("custom AI base URL and model are preserved", () => {
  const normalized = settings.normalize({
    provider: "unexpected",
    aiApiKey: "  example-key  ",
    aiBaseUrl: "https://api.example.com/v1/",
    aiModel: "  example-model  ",
  });

  assert.equal(normalized.provider, "deepseek");
  assert.equal(normalized.aiBaseUrl, "https://api.example.com/v1");
  assert.equal(normalized.aiModel, "example-model");
  assert.equal(normalized.aiApiKey, "example-key");
  assert.equal(
    settings.chatCompletionsUrl(normalized.aiBaseUrl),
    "https://api.example.com/v1/chat/completions",
  );
});

test("empty or invalid AI endpoint config falls back to DeepSeek defaults", () => {
  const empty = settings.normalize({});
  assert.equal(empty.aiBaseUrl, "https://api.deepseek.com");
  assert.equal(empty.aiModel, "deepseek-v4-flash");
  assert.equal(
    settings.chatCompletionsUrl(),
    "https://api.deepseek.com/chat/completions",
  );

  const invalid = settings.normalize({
    aiBaseUrl: "not a url",
    aiModel: "   ",
  });
  assert.equal(invalid.aiBaseUrl, settings.DEFAULTS.aiBaseUrl);
  assert.equal(invalid.aiModel, settings.DEFAULTS.aiModel);

  assert.equal(settings.isValidAiBaseUrl("https://api.openai.com/v1"), true);
  assert.equal(settings.isValidAiBaseUrl("http://localhost:11434/v1"), true);
  assert.equal(settings.isValidAiBaseUrl("http://example.com"), false);
  assert.equal(settings.isValidAiBaseUrl("ftp://api.deepseek.com"), false);
  assert.equal(settings.isValidAiBaseUrl(""), false);
});

test("legacy custom migration clears only the AI key and is idempotent", () => {
  const legacy = {
    provider: "custom",
    aiApiKey: "custom-secret",
    aiBaseUrl: "https://api.example.com/v1",
    aiModel: "example-model",
  };
  const first = settings.migrateLegacyCustom(legacy);

  assert.equal(first.migrated, true);
  assert.equal(first.settings.provider, "deepseek");
  assert.equal(first.settings.aiBaseUrl, settings.DEFAULTS.aiBaseUrl);
  assert.equal(first.settings.aiModel, settings.DEFAULTS.aiModel);
  assert.equal(first.settings.aiApiKey, "");

  const second = settings.migrateLegacyCustom(first.settings);
  assert.equal(second.migrated, false);
  assert.deepEqual(second.settings, first.settings);

  const configuredDeepSeek = settings.normalize({
    ...first.settings,
    aiApiKey: "new-deepseek-key",
  });
  assert.equal(configuredDeepSeek.aiApiKey, "new-deepseek-key");
});

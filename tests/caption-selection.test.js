const test = require("node:test");
const assert = require("node:assert/strict");

const captions = require("../captions.js");

const native = (languageCode) => ({ languageCode, baseUrl: `u-${languageCode}` });
const auto = (languageCode) => ({
  languageCode,
  kind: "asr",
  baseUrl: `u-auto-${languageCode}`,
});

test("native Chinese beats native English", () => {
  const picked = captions.selectCaptionTrack([native("en"), native("zh-Hans")]);
  assert.equal(picked.languageCode, "zh-Hans");
});

test("language order is Chinese, then English, then other, within native", () => {
  assert.equal(
    captions.selectCaptionTrack([native("ja"), native("en")]).languageCode,
    "en",
  );
  assert.equal(
    captions.selectCaptionTrack([native("ja"), native("fr")]).languageCode,
    "ja",
  );
});

test("auto-generated tracks follow the same language order", () => {
  const picked = captions.selectCaptionTrack([auto("ja"), auto("en"), auto("zh-Hant")]);
  assert.equal(picked.languageCode, "zh-Hant");
  assert.equal(picked.kind, "asr");
});

test("no tracks means no selection", () => {
  assert.equal(captions.selectCaptionTrack([]), null);
  assert.equal(captions.selectCaptionTrack(undefined), null);
});

test("any native beats any auto-generated", () => {
  const picked = captions.selectCaptionTrack([
    auto("zh-Hans"),
    native("ja"),
    auto("en"),
  ]);
  assert.equal(picked.languageCode, "ja");
  assert.equal(picked.kind, undefined);
});

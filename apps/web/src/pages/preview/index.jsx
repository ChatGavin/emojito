import Emojito from "@emojito/core";

export function Preview() {
  return (
    <div className="w-full h-full p-4">
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium mb-2">Emoji 组件示例</h3>
          <div className="space-y-2">
            <p>
              使用 emoji 字符: <Emojito code="😊" />
            </p>
            <p>
              使用 Unicode 码点: <Emojito code="U+1F60A" />
            </p>
            <p>
              自定义大小 (32px): <Emojito code="U+1F60A" size={32} />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

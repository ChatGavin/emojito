import React from "react";
import emojiCategories from "../../data/emoji-categories.json";

export const Content = () => {
  return (
    <div className="flex-1 h-full w-full overflow-y-auto pt-6 pr-6 pl-6 pb-24">
      <div className="space-y-8 w-full">
        {emojiCategories.map((category) => (
          <div key={category.id} className="space-y-4">
            {category.subgroups.map((subgroup) => (
              <div key={subgroup.id} className="space-y-2">
                <h2 className="text-xl font-semibold">{subgroup.name}</h2>
                <div className="flex flex-wrap gap-2">
                  {subgroup.emojis.map((emoji) => (
                    <div
                      key={emoji.id}
                      className="flex items-center justify-center w-12 h-12 text-2xl hover:bg-gray-100 rounded-lg cursor-pointer"
                      title={emoji.description}
                    >
                      {emoji.emoji}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

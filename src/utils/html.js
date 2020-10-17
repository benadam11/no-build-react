// helper file so we don't have to bind htm to react everywhere
import React from "https://cdn.skypack.dev/react";
import htm from "https://cdn.skypack.dev/htm";
export const html = htm.bind(React.createElement);

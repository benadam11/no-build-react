import { React, ReactDOM } from "https://cdn.pika.dev/es-react";
import htm from "https://cdn.pika.dev/htm";

export const html = htm.bind(React.createElement);
export const { render } = ReactDOM;
export const { useState } = React;
import Code from "@editorjs/code";
import Delimiter from "@editorjs/delimiter";
import Embed from "@editorjs/embed";
import InlineCode from "@editorjs/inline-code";
import List from "@editorjs/list";
import Marker from "@editorjs/marker";
import Quote from "@editorjs/quote";
import Raw from "@editorjs/raw";
import SimpleImage from "@editorjs/simple-image";
import Table from "@editorjs/table";
import Header from '@editorjs/header'

export const EDITOR_JS_TOOLS = {
  header: Header,
  embed: Embed,
  table: Table,
  list: List,
  code: Code,
  raw: Raw,
  quote: Quote,
  marker: Marker,
  delimiter: Delimiter,
  inlineCode: InlineCode,
  simpleImage: SimpleImage
};
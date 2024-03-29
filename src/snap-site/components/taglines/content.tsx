/* eslint-disable react/display-name */
/** @jsxImportSource theme-ui */
import { ReactNode } from "react";
import { ControlType, applyPropertyControls } from "../../property-controls";

const TaglineContent = ({ textAlign = "left", ...props }) => (
  <section
    sx={{
      px: 2,
      py: [3, 4, 5],
      textAlign: "center",
    }}
    {...props}
  />
);

TaglineContent.Container = (props: any) => (
  <section
    sx={{
      maxWidth: "container",
      mx: "auto",
    }}
    {...props}
  />
);

TaglineContent.Heading = ({ children, ...props }: { children: ReactNode }) => (
  <h3
    sx={{
      m: 0,
      fontSize: [3, 4, 6],
      lineHeight: "heading",
      fontWeight: "heading",
    }}
    {...props}
  >
    {children}
  </h3>
);

TaglineContent.Paragraph = (props: any) => (
  <p
    sx={{
      mt: 0,
      mb: 3,
      fontSize: 3,
      lineHeight: "body",
      fontWeight: "body",
    }}
    {...props}
  />
);

applyPropertyControls(TaglineContent, {
  textAlign: {
    type: ControlType.Enum,
    options: ["left", "center", "right"],
  },
  sx: {
    type: ControlType.Style,
  },
});

applyPropertyControls(TaglineContent.Container, {
  textAlign: {
    type: ControlType.Enum,
    options: ["left", "center", "right"],
  },
  sx: {
    type: ControlType.Style,
  },
});

applyPropertyControls(TaglineContent.Heading, {
  as: {
    title: "Element Type",
    type: ControlType.Enum,
    options: ["p", "h1", "h2", "h3", "h4", "h5", "h6"],
  },
  children: {
    title: "Text",
    type: ControlType.String,
  },
  sx: {
    type: ControlType.Style,
  },
});

applyPropertyControls(TaglineContent.Paragraph, {
  as: {
    title: "Element Type",
    type: ControlType.Enum,
    options: ["p", "h1", "h2", "h3", "h4", "h5", "h6"],
  },
  children: {
    title: "Text",
    type: ControlType.String,
  },
  sx: {
    type: ControlType.Style,
  },
});

TaglineContent.usage = `
  <TaglineContent>
    <TaglineContent.Container>
      <TaglineContent.Heading>
        What is a block?
      </TaglineContent.Heading>
      <TaglineContent.Paragraph>
        A Block refers to a piece of content or a component.
        It's a section of your content while a document is a
        collection of blocks.
      </TaglineContent.Paragraph>
      <TaglineContent.Paragraph>
        Blocks can be simple like a paragraph of text or even
        a box with a tomato background color. Blocks can be
        complex like an embedded spreadsheet or a chart that
        fetches live data.
      </TaglineContent.Paragraph>
    </TaglineContent.Container>
  </TaglineContent>
`;

export default TaglineContent;

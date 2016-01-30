import MarkdownIt from 'markdown-it';

export default (markdown) => {
  const md = new MarkdownIt({
    breaks: true,
  });

  return {
    __html: md.renderInline(markdown),
  };
};

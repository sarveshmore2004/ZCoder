import escapeHtml from "escape-html";

// Custom middleware to sanitize inputs but preserve code blocks
const sanitizePreservingCodeBlocks = (req, res, next) => {
  const fieldsToSanitize = ["content", "name", "title", "bio"];

  fieldsToSanitize.forEach((field) => {
    if (req.body[field]) {
      // Extract code blocks
      const codeBlockPattern = /```(.*?)```/gs;
      const codeBlocks = [];
      let match;

      while ((match = codeBlockPattern.exec(req.body[field])) !== null) {
        codeBlocks.push(match[0]);
      }

      // Escape the rest of the content
      let sanitizedContent = escapeHtml(req.body[field]);

      // Re-insert code blocks
      codeBlocks.forEach((block) => {
        sanitizedContent = sanitizedContent.replace(escapeHtml(block), block);
      });

      // Update the request body
      req.body[field] = sanitizedContent;
    }
  });

  next();
};

export { sanitizePreservingCodeBlocks };

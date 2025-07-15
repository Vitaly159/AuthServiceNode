import { App } from "./app";

const PORT = process.env.PORT || 4000;

App()
  .then((app) => {
    app.listen(PORT, () => {
      console.log(`🚀 Server is running at http://localhost:${PORT}/graphql`);
    });
  })
  .catch((err) => {
    console.error("Failed to start server:", err);
  });

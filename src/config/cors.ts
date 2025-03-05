import cors from "cors";

const allowedOrigins = [
  "https://l9c9c4wk-3000.inc1.devtunnels.ms",
  "http://localhost:3000",
  "http://localhost:3001",
  "https://devdrishti.wiztap.in",
  "https://drishti.wiztap.in",
];

const corsOptions = {
  origin: function (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void
  ) {
    if ((origin && allowedOrigins.indexOf(origin) !== -1) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

const corsMiddleware = cors(corsOptions);

export default corsMiddleware;

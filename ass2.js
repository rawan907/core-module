//q1
const path = require("node:path");

function logCurrentFileAndDir() {
  const result = {
    File: __filename,
    Dir: __dirname,
  };
  console.log(result);
  return result;
}

logCurrentFileAndDir();
//q2
const path = require("node:path");

function getFileName(filePath) {
  return path.basename(filePath);
}

// Example:
console.log(getFileName("/user/files/report.pdf")); // "report.pdf"
//q3
const path = require("node:path");

function buildPath(pathObj) {
  return path.format(pathObj);
}

// Example:
console.log(buildPath({ dir: "/folder", name: "app", ext: ".js" })); // "/folder/app.js"
//q4
const path = require("node:path");

function getFileExtension(filePath) {
  return path.extname(filePath);
}

// Example:
console.log(getFileExtension("/docs/readme.md")); // ".md"
//q5
const path = require("node:path");

function parseNameAndExt(filePath) {
  const { name, ext } = path.parse(filePath);
  return { Name: name, Ext: ext };
}

// Example:
console.log(parseNameAndExt("/home/app/main.js")); // { Name: "main", Ext: ".js" }
//q6
const path = require("node:path");

function isAbsolutePath(filePath) {
  return path.isAbsolute(filePath);
}

console.log(isAbsolutePath("/home/user/file.txt")); // true
//q7
const path = require("node:path");

function joinSegments(...segments) {
  return path.join(...segments);
}

// مثال:
console.log(joinSegments("src", "components", "App.js")); // src/components/App.js
//8
const path = require("node:path");

function resolveToAbsolute(relativePath) {
  return path.resolve(relativePath);
}

console.log(resolveToAbsolute("./index.js")); // مثلاً: /home/user/project/src/index.js
//9
const path = require("node:path");

function joinTwoPaths(path1, path2) {
  return path.join(path1, path2);
}

// مثال:
console.log(joinTwoPaths("/folder1", "folder2/file.txt")); // /folder1/folder2/file.txt
//q10
const fs = require("node:fs");
const path = require("node:path");

function deleteFileAsync(filePath) {
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error("Error deleting file:", err.message);
      return;
    }
    const fileName = path.basename(filePath);
    console.log(`The ${fileName} is deleted.`);
  });
}

// مثال:
deleteFileAsync("/path/to/file.txt"); // The file.txt is deleted.
//q11
const fs = require("node:fs");

function createFolderSync(folderPath) {
  try {
    fs.mkdirSync(folderPath, { recursive: true });
    console.log("Success");
    return "Success";
  } catch (err) {
    console.error("Error creating folder:", err.message);
  }
}

// مثال:
createFolderSync("./new-folder"); // Success
//q12
const EventEmitter = require("node:events");

const emitter = new EventEmitter();

emitter.on("start", () => {
  console.log("Welcome event triggered!");
});

// تشغيل الحدث:
emitter.emit("start"); // Welcome event triggered!
//q13
const EventEmitter = require("node:events");

const emitter = new EventEmitter();

function triggerLogin(username) {
  emitter.emit("login", username);
}

emitter.on("login", (username) => {
  console.log(`User logged in: ${username}`);
});

// مثال:
triggerLogin("Ahmed"); // User logged in: Ahmed
//q14
const fs = require("node:fs");

function readFileSyncContent(filePath) {
  try {
    const content = fs.readFileSync(filePath, "utf8");
    console.log(`the file content => “${content}”`);
    return content;
  } catch (err) {
    console.error("Error reading file:", err.message);
  }
}

// مثال:
readFileSyncContent("./notes.txt"); // the file content => “This is a note.”
//q15
const fs = require("node:fs");

function writeFileAsync(filePath, content) {
  fs.writeFile(filePath, content, "utf8", (err) => {
    if (err) {
      console.error("Error writing file:", err.message);
      return;
    }
    console.log("Saved asynchronously!");
  });
}

// مثال:
writeFileAsync("./async.txt", "Async save");
//q16
const fs = require("node:fs");

function checkPathExists(targetPath) {
  return fs.existsSync(targetPath);
}

// مثال:
console.log(checkPathExists("./notes.txt")); // true أو false حسب وجوده
//q17
const os = require("node:os");

function getSystemInfo() {
  return {
    Platform: os.platform(),
    Arch: os.arch(),
  };
}

// مثال:
console.log(getSystemInfo()); // مثلاً: { Platform: "win32", Arch: "x64" }
//q18
const fs = require("node:fs");

function readFileInChunks(filePath) {
  const readStream = fs.createReadStream(filePath, { encoding: "utf8" });

  readStream.on("data", (chunk) => {
    console.log("--- New Chunk ---");
    console.log(chunk);
  });

  readStream.on("end", () => {
    console.log("Finished reading file.");
  });

  readStream.on("error", (err) => {
    console.error("Error reading stream:", err.message);
  });
}

// مثال:
readFileInChunks("./big.txt");
//q19
const fs = require("node:fs");

function copyFileWithStreams(sourcePath, destPath) {
  const readStream = fs.createReadStream(sourcePath);
  const writeStream = fs.createWriteStream(destPath);

  readStream.on("error", (err) => {
    console.error("Read error:", err.message);
  });

  writeStream.on("error", (err) => {
    console.error("Write error:", err.message);
  });

  writeStream.on("finish", () => {
    console.log("File copied using streams");
  });

  readStream.pipe(writeStream);
}

// مثال:
copyFileWithStreams("./source.txt", "./dest.txt");
//20
const fs = require("node:fs");
const zlib = require("node:zlib");
const { pipeline } = require("node:stream");

function compressFile(sourcePath, destGzPath) {
  pipeline(
    fs.createReadStream(sourcePath),
    zlib.createGzip(),
    fs.createWriteStream(destGzPath),
    (err) => {
      if (err) {
        console.error("Pipeline failed:", err.message);
        return;
      }
      console.log("File compressed successfully.");
    },
  );
}

// مثال:
compressFile("./data.txt", "./data.txt.gz");
//part2
const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000;
const USERS_FILE = path.join(__dirname, "users.json");

// Helper: قراءة المستخدمين من ملف JSON
function readUsers() {
  if (!fs.existsSync(USERS_FILE)) {
    fs.writeFileSync(USERS_FILE, JSON.stringify([], null, 2), "utf8");
    return [];
  }
  const data = fs.readFileSync(USERS_FILE, "utf8").trim();
  if (!data) return [];
  return JSON.parse(data);
}

// Helper: كتابة المستخدمين في ملف JSON
function writeUsers(users) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), "utf8");
}

// Helper: قراءة الـ JSON Body من الـ Request
function getRequestBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      if (!body) return resolve({});
      try {
        resolve(JSON.parse(body));
      } catch (err) {
        reject(err);
      }
    });
    req.on("error", reject);
  });
}

// Helper: إرسال رد JSON
function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, { "Content-Type": "application/json" });
  res.end(JSON.stringify(payload));
}

const server = http.createServer(async (req, res) => {
  const { method, url } = req;
  const cleanUrl = url.split("?")[0];

  try {
    // 4) GET /user -> Get all users from JSON file
    if (method === "GET" && cleanUrl === "/user") {
      const users = readUsers();
      return sendJson(res, 200, users);
    }

    // 1) POST /user -> Add a new user if email doesn't exist
    if (method === "POST" && cleanUrl === "/user") {
      const { name, age, email } = await getRequestBody(req);
      const users = readUsers();

      const emailExists = users.some(
        (u) => u.email.toLowerCase() === String(email).toLowerCase(),
      );
      if (emailExists) {
        return sendJson(res, 409, { message: "Email already exists." });
      }

      const nextId =
        users.length > 0
          ? Math.max(...users.map((u) => Number(u.id) || 0)) + 1
          : 1;

      const newUser = {
        id: nextId,
        name,
        age,
        email,
      };

      users.push(newUser);
      writeUsers(users);

      return sendJson(res, 201, { message: "User added successfully." });
    }

    // مطابقة المسارات الديناميكية /user/:id
    const userIdMatch = cleanUrl.match(/^\/user\/(\d+)$/);

    // 2) PATCH /user/:id -> Update name, age, or email by ID
    if (method === "PATCH" && userIdMatch) {
      const userId = Number(userIdMatch[1]);
      const updates = await getRequestBody(req);
      const users = readUsers();

      const userIndex = users.findIndex((u) => Number(u.id) === userId);
      if (userIndex === -1) {
        return sendJson(res, 404, { message: "User ID not found." });
      }

      let updatedField = null;
      if (updates.name !== undefined) {
        users[userIndex].name = updates.name;
        updatedField = "name";
      }
      if (updates.age !== undefined) {
        users[userIndex].age = updates.age;
        updatedField = "age";
      }
      if (updates.email !== undefined) {
        users[userIndex].email = updates.email;
        updatedField = "email";
      }

      writeUsers(users);

      const message = updatedField
        ? `User ${updatedField} updated successfully.`
        : "User updated successfully.";

      return sendJson(res, 200, { message });
    }

    // 3) DELETE /user/:id -> Delete a user by ID
    if (method === "DELETE" && userIdMatch) {
      const userId = Number(userIdMatch[1]);
      const users = readUsers();

      const userIndex = users.findIndex((u) => Number(u.id) === userId);
      if (userIndex === -1) {
        return sendJson(res, 404, { message: "User ID not found." });
      }

      users.splice(userIndex, 1);
      writeUsers(users);

      return sendJson(res, 200, { message: "User deleted successfully." });
    }

    // أي مسار آخر
    return sendJson(res, 404, { message: "Route not found." });
  } catch (err) {
    return sendJson(res, 400, {
      message: "Invalid request.",
      error: err.message,
    });
  }
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
const userIdMatch = cleanUrl.match(/^\/user\/(\d+)$/);
// 5) GET /user/:id -> Get a single user by ID from JSON file
if (method === "GET" && userIdMatch) {
  const userId = Number(userIdMatch[1]);
  const users = readUsers();

  const user = users.find((u) => Number(u.id) === userId);
  if (!user) {
    return sendJson(res, 404, { message: "User not found." });
  }

  return sendJson(res, 200, user);
}

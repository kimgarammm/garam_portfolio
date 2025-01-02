import path from "path";
import CopyWebpackPlugin from "copy-webpack-plugin";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.resolve(__filename, "..");

export default function loopPathArr(stringArray) {
  let arr = [];
  for (let i = 0; i < stringArray.length; i++) {
    const folderName = stringArray[i].split("/");
    arr.push({
      from: path.resolve(__dirname, stringArray[i]),
      to: folderName[folderName.length - 1],
      noErrorOnMissing: true,
    });
  }
  return new CopyWebpackPlugin({
    patterns: arr,
  });
}

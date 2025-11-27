"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.docxToPdf = exports.deleteFile = exports.getFile = exports.uploadFile = void 0;
exports.modifyDocxWithVars = modifyDocxWithVars;
const supabase_1 = require("../../lib/supabase");
const error_1 = require("../../types/http/error");
const createHttpResponse_1 = require("../createHttpResponse");
const axios_1 = __importDefault(require("axios"));
const form_data_1 = __importDefault(require("form-data"));
const pizzip_1 = __importDefault(require("pizzip"));
const docxtemplater_1 = __importDefault(require("docxtemplater"));
const uploadFile = (req, options) => __awaiter(void 0, void 0, void 0, function* () {
    const file = req.file;
    if (!file) {
        throw (0, createHttpResponse_1.createHttpErr)(error_1.ErrorKey.MISSING_KEY, 'Missing "file" key');
    }
    const { error } = yield supabase_1.sbdb.storage.from(options.bucket).upload(options.path, file.buffer, {
        contentType: file.mimetype
    });
    if (error)
        throw error;
    const { data: resData } = supabase_1.sbdb.storage.from(options.bucket).getPublicUrl(options.path);
    return (0, createHttpResponse_1.createHttpSuccess)({ path: options.path, url: resData.publicUrl });
});
exports.uploadFile = uploadFile;
const getFile = (req, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { data, error } = yield supabase_1.sbdb.storage.from(options.bucket).download(options.path);
    if (error)
        throw error;
    return data;
});
exports.getFile = getFile;
const deleteFile = (req, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = yield supabase_1.sbdb.storage.from(options.bucket).remove([options.path]);
    if (error)
        throw error;
    return (0, createHttpResponse_1.createHttpSuccess)({ message: 'File deleted successfully' });
});
exports.deleteFile = deleteFile;
const docxToPdf = (req, fileInput, fileName) => __awaiter(void 0, void 0, void 0, function* () {
    if (!fileInput)
        throw (0, createHttpResponse_1.createHttpErr)(error_1.ErrorKey.BAD_REQUEST, 'File is not a docx file');
    const incomingFile = req.file;
    const buffer = Buffer.isBuffer(fileInput) ? fileInput : Buffer.from(yield fileInput.arrayBuffer());
    const formData = new form_data_1.default();
    formData.append('file', buffer, {
        filename: incomingFile
            ? (incomingFile === null || incomingFile === void 0 ? void 0 : incomingFile.originalname.split('.').pop()) + new Date().getTime().toString() + '.docx'
            : fileName,
        contentType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    });
    formData.append('userId', '23');
    const response = yield axios_1.default.post(`${process.env.PYTHON_SERVER_URL}/upload`, formData, {
        headers: Object.assign({}, formData.getHeaders() // Quan trọng: để axios biết multipart/form-data với boundary
        ),
        responseType: 'arraybuffer', // **Phải dùng arraybuffer để nhận binary**
        maxContentLength: Infinity, // Tùy chọn cho file lớn
        maxBodyLength: Infinity
    });
    const pdfBuffer = Buffer.from(response.data);
    return pdfBuffer;
});
exports.docxToPdf = docxToPdf;
const delimiters = { start: '{{', end: '}}' };
function modifyDocxWithVars(buffer, sbUploadOptions, replacements) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { outputPath, bucket } = sbUploadOptions !== null && sbUploadOptions !== void 0 ? sbUploadOptions : {};
            const zip = new pizzip_1.default(buffer);
            const doc = new docxtemplater_1.default(zip, {
                paragraphLoop: true,
                linebreaks: true,
                delimiters,
                nullGetter: (part) => {
                    const { tag, raw, module, value } = part;
                    if (process.env.NODE_ENV === 'development')
                        console.warn(`Null value for tag: ${tag} (raw: ${raw}, module: ${module}, value: ${value})`);
                    return delimiters.start + value + delimiters.end;
                },
                syntax: {
                    allowUnopenedTag: true,
                    allowUnclosedTag: true
                }
            });
            doc.render(replacements !== null && replacements !== void 0 ? replacements : {});
            const bff = doc.getZip().generate({ type: 'nodebuffer' });
            const { data, error } = yield supabase_1.sbdb.storage.from(bucket !== null && bucket !== void 0 ? bucket : 'TMP').upload(outputPath !== null && outputPath !== void 0 ? outputPath : 'TMP', bff, {
                contentType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                upsert: true
            });
            if (error)
                throw error;
            return { path: data.path, fullPath: data.fullPath, buffer: bff };
        }
        catch (error) {
            console.error('Error modifying DOCX:', error);
            throw error;
        }
    });
}

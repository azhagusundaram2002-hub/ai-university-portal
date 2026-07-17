"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = __importDefault(require("axios"));
let AiService = class AiService {
    async chat(message) {
        try {
            const response = await axios_1.default.post('http://localhost:11434/api/generate', {
                model: 'llama3.2',
                prompt: `
You are an AI assistant for a University Admission Management System.

Answer only questions related to:
- Students
- Courses
- Seat Allocation
- Dashboard
- Admission Process

User:
${message}
          `,
                stream: false,
            });
            return {
                reply: response.data.response,
            };
        }
        catch (error) {
            return {
                reply: 'Unable to connect to Ollama. Please make sure Ollama is running.',
            };
        }
    }
};
exports.AiService = AiService;
exports.AiService = AiService = __decorate([
    (0, common_1.Injectable)()
], AiService);
//# sourceMappingURL=ai.service.js.map
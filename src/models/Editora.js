import mongoose from "mongoose";

const editoraSchema = new mongoose.Schema(
    {
        id: { type: String },
        nome: {
            type: String,
            required: [true, "O nome da editora é obrigatório!"],
        },
        cidade: {
            type: String,
            required: [true, "A cidade é obrigatória!"]
        }
    },
    {
        versionKey: false
    }
);

const editoras = mongoose.model("editoras", editoraSchema);

export default editoras;
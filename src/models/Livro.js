import mongoose from "mongoose";

const LivroSchema = new mongoose.Schema(
    {
        id: { type: String },
        titulo: {
            type: String,
            required: [true, "O título do livro é obrigatório!"]
        },
        autor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "autores",
            required: [true, "O autor é obrigatório!"]
        },
        editora: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "editoras",
            required: [true, "A editora é obrigatória!"]
        },
        numeroPaginas: {
            type: Number,
            min: [10, "O número de páginas deve estar entre 10 e 5000."],
            max: [5000, "O número de páginas deve estar entre 10 e 5000."]
        }
    }
);

const livros = mongoose.model("livros", LivroSchema);

export default livros;

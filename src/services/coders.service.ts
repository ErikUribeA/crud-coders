import { ICoder, ICreate } from "@/models/coders/coder.model";
import { HttpClient } from "@/utils/client-http";

export class CoderService {
    private httpClient: HttpClient;

    constructor() {
        this.httpClient = new HttpClient()
    }

    async findAll() {
        try {
            const coders = this.httpClient.get<ICoder[]>("Coders")

            return coders
        } catch (error) {
            console.log(error)
            throw error;
        }
    }

    async destroy(id: string) {
        try {
            const coders = this.httpClient.delete<ICoder[]>(`Coders/${id}`)

            return coders
        } catch (error) {
            console.log(error)
            throw error;
        }
    }

    async create(coder: ICreate) {
        try {
            const createCoder = this.httpClient.post("Coders", coder)

            return createCoder
        } catch (error) {
            console.log(error)
            throw error;
        }
    }

    async save(id: string, coderName: string) {
        try {
            const actualizarCoder = await this.httpClient.put(`Coders/${id}`, { name: coderName });
            return actualizarCoder;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}
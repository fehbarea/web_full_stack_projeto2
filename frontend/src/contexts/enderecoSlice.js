import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import buscaCep from '../cepService';

export const consultarEndereco = createAsyncThunk(
    'endereco/consultarEndereco',
    async ({ estado, cidade, rua }) => {
        try {
            const ceps = await buscaCep(estado, cidade, rua);
            return {
                dados: { estado, cidade, rua },
                ceps
            };
        } catch (error) {
            throw error;
        }
    }
);

const enderecoSlice = createSlice({
    name: 'endereco',
    initialState: {
        estado: '',
        cidade: '',
        rua: '',
        ceps: [],
        status: '',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(consultarEndereco.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(consultarEndereco.fulfilled, (state, action) => {
                const { dados, ceps } = action.payload;
                state.estado = dados.estado;
                state.cidade = dados.cidade;
                state.rua = dados.rua;
                state.ceps = ceps;
                state.status = 'succeeded';
            })
            .addCase(consultarEndereco.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export default enderecoSlice.reducer;
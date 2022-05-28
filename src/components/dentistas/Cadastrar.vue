<template>
  <div class="modal" @click="verificaCloseModal">
    <div>
      <div class="title">
        <h2>Cadastrar Dentista</h2>
      </div>
      <form @submit.prevent="sendDentista">
        <div>
          <span class="label">Ativo?*</span>
          <input
            required
            v-model="dentista.ativo"
            type="radio"
            value="1"
            name="ativo"
            id="ativo-sim"
          />
          <label class="radio" for="ativo-sim">Sim</label>
          <input
            required
            v-model="dentista.ativo"
            type="radio"
            value="0"
            name="ativo"
            id="ativo-nao"
          />
          <label class="radio" for="ativo-nao">Não</label>
        </div>
        <div>
          <label for="cor">Cor*</label>
          <input
            required
            type="color"
            v-model="dentista.cor"
            name="cor"
            id="cor"
          />
        </div>
        <div class="full">
          <label for="usuario">Usuário*</label>
          <select
            required
            v-if="usuarios"
            v-model="dentista.id_usuario"
            name="usuario"
            id="usuario"
          >
            <option
              v-for="usuario in usuarios"
              :key="usuario.id"
              :value="usuario.id"
            >
              {{ usuario.usuario }}
            </option>
          </select>
          <input
            v-else
            required
            type="text"
            :disabled="!usuarios"
            placeholder="Nenhum disponível"
          />
        </div>
        <div class="full">
          <label for="nome">Nome*</label>
          <input
            required
            type="text"
            v-model="dentista.nome"
            name="nome"
            id="nome"
          />
        </div>
        <div class="full">
          <label for="inscricao">Inscrição*</label>
          <input
            required
            type="text"
            v-model="dentista.inscricao"
            name="inscricao"
            id="inscricao"
          />
        </div>
        <div>
          <label for="cpf">CPF*</label>
          <input
            required
            type="tel"
            v-mask="'###.###.###-##'"
            v-model="dentista.cpf"
            name="cpf"
            id="cpf"
          />
        </div>
        <div>
          <label for="data_nascimento">Data de Nascimento*</label>
          <input
            required
            type="date"
            v-model="dentista.data_nascimento"
            name="data_nascimento"
            id="data_nascimento"
          />
        </div>
        <div>
          <label for="telefone">Telefone*</label>
          <input
            required
            type="tel"
            v-mask="['(##) ####-####', '(##) #####-####']"
            v-model="dentista.telefone"
            name="telefone"
            id="telefone"
          />
        </div>
        <div>
          <label for="cep">CEP*</label>
          <input
            required
            @blur="consultaCEP"
            type="tel"
            v-mask="'#####-###'"
            v-model="dentista.cep"
            name="cep"
            id="cep"
          />
        </div>
        <div class="full">
          <label for="rua">Rua*</label>
          <input
            required
            type="text"
            v-model="dentista.rua"
            name="rua"
            id="rua"
          />
        </div>
        <div>
          <label for="numero">Número*</label>
          <input
            required
            type="text"
            v-model="dentista.numero"
            name="numero"
            id="numero"
          />
        </div>
        <div>
          <label for="bairro">Bairro*</label>
          <input
            required
            type="text"
            v-model="dentista.bairro"
            name="bairro"
            id="bairro"
          />
        </div>
        <div>
          <label for="cidade">Cidade*</label>
          <input
            required
            type="text"
            v-model="dentista.cidade"
            name="cidade"
            id="cidade"
          />
        </div>
        <div>
          <label for="estado">Estado*</label>
          <input
            required
            type="text"
            v-model="dentista.estado"
            name="estado"
            id="estado"
            maxlength="2"
          />
        </div>
        <div class="buttons">
          <button :disabled="!usuarios">Cadastrar</button>
          <button @click.prevent="closeModal" class="close">Cancelar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import api from "@/api.js";

export default {
  name: "CadastrarDentista",
  data() {
    return {
      usuarios: null,
      dentista: {
        ativo: null,
        cor: null,
        id_usuario: null,
        nome: null,
        inscricao: null,
        cpf: null,
        data_nascimento: null,
        telefone: null,
        cep: null,
        rua: null,
        numero: null,
        bairro: null,
        cidade: null,
        estado: null,
      },
    };
  },
  created() {
    api.get(`/usuario/get`).then((response) => {
      this.usuarios = response.data.data;
    });
  },
  methods: {
    consultaCEP() {
      const cep = this.dentista.cep.replace("-", "");

      if (cep.length == 8) {
        api
          .get(`https://viacep.com.br/ws/${cep}/json/`, {
            baseURL: "",
          })
          .then((response) => {
            if (response.data.erro == "true") {
              this.$swal({
                icon: "warning",
                title: "Atenção!",
                text: "CEP não encontrado!",
              });
            } else {
              this.dentista.rua = response.data.logradouro;
              this.dentista.bairro = response.data.bairro;
              this.dentista.cidade = response.data.localidade;
              this.dentista.estado = response.data.uf;

              document.querySelector("input#numero").focus();
            }
          })
          .catch(() => {
            this.$swal({
              icon: "warning",
              title: "Atenção!",
              text: "CEP não encontrado!",
            });
          });
      } else {
        this.$swal({
          icon: "warning",
          title: "Atenção!",
          text: "Informe um CEP válido!",
        });
      }
    },
    sendDentista() {
      api
        .post("/dentista/send", this.dentista, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          this.$swal({
            icon: "success",
            title: "Cadastrado!",
            text: response.data.data,
            onClose: this.closeModal(),
          });
        })
        .catch((response) => {
          this.$swal({
            icon: "error",
            title: "Erro!",
            text: response.response.data.data,
            onClose: this.closeModal(),
          });
        });
    },
    verificaCloseModal(e) {
      if (e.target === e.currentTarget) {
        this.closeModal();
      }
    },
    closeModal() {
      this.$emit("close-modal");
    },
  },
};
</script>

<style lang="scss" scoped>
input[type="color"] {
  padding: 0px 5px;
}
</style>

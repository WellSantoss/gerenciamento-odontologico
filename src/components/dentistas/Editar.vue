<template>
  <div class="modal" @click="verificaCloseModal">
    <div>
      <div class="title">
        <h2>Editar Dentista</h2>
        <p>{{ dentista.nome }}</p>
      </div>
      <form @submit.prevent="updateDentista">
        <div>
          <span class="label">Ativo?*</span>
          <input
            required
            v-model="dentista.ativo"
            type="radio"
            :disabled="!editar"
            value="1"
            name="ativo"
            id="ativo-sim"
          />
          <label class="radio" for="ativo-sim">Sim</label>
          <input
            required
            v-model="dentista.ativo"
            type="radio"
            :disabled="!editar"
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
            :disabled="!editar"
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
            :disabled="!editar"
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
            :disabled="!editar"
            v-model="dentista.nome"
            name="nome"
            id="nome"
          />
        </div>
        <div>
          <label for="inscricao">Inscrição*</label>
          <input
            required
            type="text"
            :disabled="!editar"
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
            :disabled="!editar"
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
            :disabled="!editar"
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
            name="telefone"
            id="telefone"
            :disabled="!editar"
            v-model="dentista.telefone"
          />
        </div>
        <div>
          <label for="cep">CEP*</label>
          <input
            required
            type="tel"
            v-mask="'#####-###'"
            @blur="consultaCEP"
            name="cep"
            id="cep"
            :disabled="!editar"
            v-model="dentista.cep"
            maxlength="9"
            minlength="8"
          />
        </div>
        <div>
          <label for="numero">Número*</label>
          <input
            required
            type="text"
            name="numero"
            id="numero"
            :disabled="!editar"
            v-model="dentista.numero"
          />
        </div>
        <div class="full">
          <label for="rua">Rua*</label>
          <input
            required
            type="text"
            :disabled="!editar"
            v-model="dentista.rua"
            name="rua"
            id="rua"
          />
        </div>
        <div class="full">
          <label for="bairro">Bairro*</label>
          <input
            required
            type="text"
            name="bairro"
            id="bairro"
            :disabled="!editar"
            v-model="dentista.bairro"
          />
        </div>
        <div>
          <label for="cidade">Cidade*</label>
          <input
            required
            type="text"
            name="cidade"
            id="cidade"
            :disabled="!editar"
            v-model="dentista.cidade"
          />
        </div>
        <div>
          <label for="estado">Estado*</label>
          <input
            required
            type="text"
            name="estado"
            id="estado"
            :disabled="!editar"
            v-model="dentista.estado"
            maxlength="2"
          />
        </div>

        <div class="buttons">
          <button v-if="editar" :disabled="!usuarios">Salvar</button>
          <button
            v-else
            @click.prevent="editar = !editar"
            :disabled="!usuarios"
          >
            Editar
          </button>
          <button @click.prevent="closeModal" class="close">Cancelar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import api from "@/api.js";

export default {
  name: "EditarDentista",
  props: {
    dentista: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      editar: false,
      usuarios: null,
    };
  },
  created() {
    api.get(`/usuario/disponiveis/${this.dentista.id}`).then((response) => {
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
    updateDentista() {
      api
        .post(`/dentista/update/${this.dentista.id}`, this.dentista, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          this.$swal({
            icon: "success",
            title: "Atualizado!",
            text: response.data.data,
            onClose: this.closeModal(),
          }).then((result) => {
            if (result.isConfirmed) {
              this.closeModal();
            }
          });
        })
        .catch((response) => {
          this.$swal({
            icon: "error",
            title: "Erro!",
            text: response.response.data.data,
            onClose: this.closeModal(),
          }).then((result) => {
            if (result.isConfirmed) {
              this.closeModal();
            }
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

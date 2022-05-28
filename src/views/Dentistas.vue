<template>
  <div class="content">
    <Search @cadastrar="modalCadastrar = !modalCadastrar" />
    <transition mode="out-in">
      <div v-if="dentistas" class="table">
        <table>
          <thead>
            <tr>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th>Ativo?</th>
              <th>Nome</th>
              <th>Usuário</th>
              <th>Telefone</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="dentista in dentistas" :key="dentista.id">
              <td class="icon">
                <img
                  @click="modalSpecialty = true"
                  src="@/assets/new-job.svg"
                  title="Especialidades"
                  alt="Especialidades"
                />
              </td>
              <td class="icon">
                <img
                  @click="modalOpeningHours = true"
                  src="@/assets/meeting-time.svg"
                  title="Horários de Atendimento"
                  alt="Horários de Atendimento"
                />
              </td>
              <td class="icon">
                <img
                  @click="editDentista(dentista.id)"
                  src="@/assets/edit.svg"
                  title="Editar"
                  alt="Editar"
                />
              </td>
              <td class="icon">
                <img
                  @click="deleteDentista(dentista.id)"
                  src="@/assets/trash.svg"
                  title="Excluir"
                  alt="Excluir"
                />
              </td>
              <td>{{ dentista.ativo ? "Sim" : "Não" }}</td>
              <td class="profile">
                <img
                  :style="`box-shadow: 0px 0px 0px 3px ${dentista.cor};`"
                  :src="`http://localhost/gerenciamento-odontologico-api/upload/${dentista.foto}`"
                  :alt="dentista.nome"
                />
                <p>{{ dentista.nome }}</p>
              </td>
              <td>{{ dentista.usuario }}</td>
              <td>{{ dentista.telefone }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p v-else-if="erro">{{ erro }}</p>
      <Loading v-else />
    </transition>
    <transition>
      <CadastrarDentista
        v-if="modalCadastrar"
        @close-modal="closeModalCadastrar"
      />
    </transition>
    <transition>
      <div class="modal" @click="closeModal" v-if="modalView">
        <div>
          <div class="title">
            <h2>{{ currentDentista.nome }}</h2>
          </div>
          <form action="/usuarios">
            <span class="label">Ativo?</span>
            <input
              type="radio"
              value="1"
              :disabled="!edit"
              v-model="currentDentista.ativo"
              nome="ativo"
              id="sim"
            />
            <label class="radio" for="sim">Sim</label>
            <input
              type="radio"
              value="0"
              :disabled="!edit"
              v-model="currentDentista.ativo"
              nome="ativo"
              id="nao"
            />
            <label class="radio" for="nao">Não</label>
            <span class="label">Foto</span>
            <img
              style="margin-bottom: 16px"
              src="@/assets/profile.jpg"
              alt=""
            />
            <label for="nome">Nome</label>
            <input
              type="text"
              nome="nome"
              id="nome"
              :disabled="!edit"
              :value="currentDentista.nome"
              :v-model="currentDentista.nome"
            />
            <label for="usuario">Usuário</label>
            <input
              type="text"
              nome="usuario"
              id="usuario"
              :disabled="!edit"
              :value="currentDentista.usuario"
              :v-model="currentDentista.usuario"
            />
            <div class="buttons">
              <button v-if="edit" @click.prevent="saveDentista">Salvar</button>
              <button v-else @click.prevent="edit = true">Editar</button>
              <button @click.prevent="modalView = !modalView" class="close">
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </transition>
    <transition>
      <div class="modal" @click="closeModalSpecialty" v-if="modalSpecialty">
        <div>
          <div class="title">
            <h2>Especialidades</h2>
            <p>{{ currentDentista.nome }}</p>
          </div>
          <form action="/usuarios">
            <div>
              <label for="nome">Especialidade</label>
              <input type="text" nome="especialidade" id="especialidade" />
            </div>
            <button @click.prevent>Adicionar</button>
          </form>
          <div class="table">
            <table>
              <thead>
                <tr>
                  <th>Especialidade</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="specialty in currentDentista.specialties"
                  :key="specialty.id"
                >
                  <td>{{ specialty.specialty }}</td>
                  <td class="icon">
                    <img
                      @click="deleteDentista(specialty.id)"
                      src="@/assets/trash.svg"
                      alt="Excluir"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </transition>
    <transition>
      <div
        class="modal"
        @click="closeModalOpeningHours"
        v-if="modalOpeningHours"
      >
        <div>
          <div class="title">
            <h2>Horários de Atendimento</h2>
            <p>{{ currentDentista.nome }}</p>
          </div>
          <form action="/usuarios">
            <div>
              <label for="dia">Dia</label>
              <input type="text" nome="dia" id="dia" />
            </div>
            <div>
              <label for="inicio">Início</label>
              <input type="text" nome="inicio" id="inicio" />
            </div>
            <div>
              <label for="final">Final</label>
              <input type="text" nome="final" id="final" />
            </div>
            <button @click.prevent>Adicionar</button>
          </form>
          <div class="table">
            <table>
              <thead>
                <tr>
                  <th>Dia</th>
                  <th>Início</th>
                  <th>Final</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="openingHour in currentDentista.openingHours"
                  :key="openingHour.id"
                >
                  <td>{{ openingHour.day }}</td>
                  <td>{{ openingHour.start }}</td>
                  <td>{{ openingHour.end }}</td>
                  <td class="icon">
                    <img
                      @click="deleteDentista(openingHour.id)"
                      src="@/assets/trash.svg"
                      alt="Excluir"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Search from "@/components/Search.vue";
import Loading from "@/components/Loading.vue";
import CadastrarDentista from "@/components/dentistas/Cadastrar.vue";
import api from "@/api.js";

export default {
  nome: "Dentistas",
  components: {
    Search,
    Loading,
    CadastrarDentista,
  },
  data() {
    return {
      erro: null,
      dentistas: null,
      modalCadastrar: false,
      modalView: false,
      modalSpecialty: false,
      modalOpeningHours: false,
      edit: false,
      currentDentista: {
        id: 1,
        ativo: true,
        nome: "Mariana Ribeiro",
        cor: "#a55eea",
        usuario: "mariana_ribeiro@dentalweb.com",
        registration: "123SP",
        cpf: "123.456.789.00",
        birth: "27/02/1998",
        telefone: "(18) 99999-9999",
        zipCode: "16000-000",
        address: "Rua Azul",
        number: "999",
        district: "Bairro Alto",
        city: "Birigui",
        state: "SP",
        specialties: [
          {
            id: 1,
            specialty: "Ortodontia",
          },
          {
            id: 1,
            specialty: "Endodontia",
          },
          {
            id: 1,
            specialty: "Implantodontia",
          },
          {
            id: 1,
            specialty: "Odontogeriatria",
          },
        ],
        openingHours: [
          {
            id: 1,
            day: "Segunda-feira",
            start: "08:30",
            end: "12:00",
          },
          {
            id: 1,
            day: "Segunda-feira",
            start: "14:00",
            end: "18:00",
          },
          {
            id: 1,
            day: "Terça-feira",
            start: "08:30",
            end: "12:00",
          },
          {
            id: 1,
            day: "Terça-feira",
            start: "14:00",
            end: "18:00",
          },
          {
            id: 1,
            day: "Sexta-feira",
            start: "08:30",
            end: "12:00",
          },
          {
            id: 1,
            day: "Sexta-feira",
            start: "14:00",
            end: "18:00",
          },
        ],
      },
    };
  },
  created() {
    this.getDentistas();
  },
  methods: {
    closeModalCadastrar() {
      this.modalCadastrar = !this.modalCadastrar;
      this.getDentistas();
    },
    getDentistas() {
      this.dentistas = null;

      api
        .get(`/dentista/getall`)
        .then((response) => {
          this.dentistas = response.data.data;
        })
        .catch((response) => {
          this.erro = response.response.data.data;
        });
    },
    deleteDentista(dentista) {
      this.$swal({
        icon: "warning",
        title: "Atenção!",
        text: `Excluir o usuário "${dentista}"?`,
        footer: "*Está ação não poderá ser desfeita.",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        confirmButtonText: "Excluir",
      }).then((result) => {
        if (result.isConfirmed) {
          this.$swal({
            icon: "success",
            title: "Excluído!",
            text: "Usuário excluído com sucesso!",
          });
        }
      });
    },
    viewDentista() {
      this.modalView = !this.modalView;
      this.edit = false;
    },
    editDentista() {
      this.modalView = !this.modalView;
      this.edit = true;
    },
    saveDentista() {
      this.modalView = !this.modalView;

      this.$swal({
        icon: "success",
        title: "Alterado!",
        text: "Usuário alterado com sucesso!",
      });
    },
    closeModal(e) {
      if (e.target === e.currentTarget) {
        this.modalView = !this.modalView;
      }
    },
    closeModalSpecialty(e) {
      if (e.target === e.currentTarget) {
        this.modalSpecialty = !this.modalSpecialty;
      }
    },
    closeModalOpeningHours(e) {
      if (e.target === e.currentTarget) {
        this.modalOpeningHours = !this.modalOpeningHours;
      }
    },
  },
};
</script>

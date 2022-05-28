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
                  @click="deleteDentista(dentista.id, dentista.nome)"
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
      <EditarDentista
        :dentista="dentistaSelecionado"
        v-if="dentistaSelecionado"
        @close-modal="closeModalEditar"
      />
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
import EditarDentista from "@/components/dentistas/Editar.vue";
import api from "@/api.js";

export default {
  nome: "Dentistas",
  components: {
    Search,
    Loading,
    CadastrarDentista,
    EditarDentista,
  },
  data() {
    return {
      erro: null,
      dentistas: null,
      modalCadastrar: false,
      dentistaSelecionado: null,
      modalView: false,
      modalSpecialty: false,
      modalOpeningHours: false,
      edit: false,
    };
  },
  computed: {
    query() {
      return this.$route.query.q ? `/${this.$route.query.q}` : "";
    },
  },
  watch: {
    query() {
      this.getDentistas();
    },
  },
  created() {
    this.getDentistas();
  },
  methods: {
    closeModalCadastrar() {
      this.modalCadastrar = !this.modalCadastrar;
      this.getDentistas();
    },
    closeModalEditar() {
      this.dentistaSelecionado = null;
      this.getDentistas();
    },
    getDentistas() {
      this.dentistas = null;

      api
        .get(`/dentista/getall${this.query}`)
        .then((response) => {
          this.dentistas = response.data.data;
        })
        .catch((response) => {
          this.erro = response.response.data.data;
        });
    },
    deleteDentista(id, dentista) {
      this.$swal({
        icon: "warning",
        title: "Atenção!",
        text: `Excluir o dentista '${dentista}'?`,
        footer: "*Está ação não poderá ser desfeita.",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        confirmButtonText: "Excluir",
      }).then((result) => {
        if (result.isConfirmed) {
          api
            .delete(`/dentista/delete/${id}`)
            .then((response) => {
              this.$swal({
                icon: "success",
                title: "Excluído!",
                text: response.data.data,
              });

              this.getDentistas();
            })
            .catch((response) => {
              this.$swal({
                icon: "error",
                title: "Erro!",
                text: response.data.data,
              });
            });
        }
      });
    },
    editDentista(id) {
      const dentista = this.dentistas.filter((dentista) => {
        return dentista.id == id;
      });

      this.dentistaSelecionado = dentista[0];
    },
  },
};
</script>

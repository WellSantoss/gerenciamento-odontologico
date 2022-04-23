<template>
  <div class="content">
    <Search />
    <div class="table">
      <table>
        <thead>
          <tr>
            <th></th>
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
          <tr v-for="dentist in dentists" :key="dentist.id">
            <td class="icon">
              <img
                @click="viewDentist(dentist.id)"
                src="@/assets/view.svg"
                alt="Visualizar"
              />
            </td>
            <td class="icon">
              <img
                @click="modalSpecialty = true"
                src="@/assets/new-job.svg"
                alt="Editar"
              />
            </td>
            <td class="icon">
              <img
                @click="modalOpeningHours = true"
                src="@/assets/meeting-time.svg"
                alt="Excluir"
              />
            </td>
            <td class="icon">
              <img
                @click="editDentist(dentist.id)"
                src="@/assets/edit.svg"
                alt="Editar"
              />
            </td>
            <td class="icon">
              <img
                @click="deleteDentist(dentist.id)"
                src="@/assets/trash.svg"
                alt="Excluir"
              />
            </td>

            <td>{{ dentist.active ? "Sim" : "Não" }}</td>
            <td class="profile">
              <img
                :style="`box-shadow: 0px 0px 0px 3px ${dentist.color};`"
                :src="require(`@/assets/${dentist.image}`)"
                alt="Editar"
              />
              <p>{{ dentist.name }}</p>
            </td>
            <td>{{ dentist.user }}</td>
            <td>{{ dentist.phone }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <transition>
      <div class="modal" @click="closeModal" v-if="modalView">
        <div>
          <div class="title">
            <h2>{{ currentDentist.name }}</h2>
          </div>
          <form action="/usuarios">
            <span class="label">Ativo?</span>
            <input
              type="radio"
              value="1"
              :disabled="!edit"
              v-model="currentDentist.active"
              name="ativo"
              id="sim"
            />
            <label class="radio" for="sim">Sim</label>
            <input
              type="radio"
              value="0"
              :disabled="!edit"
              v-model="currentDentist.active"
              name="ativo"
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
              name="nome"
              id="nome"
              :disabled="!edit"
              :value="currentDentist.name"
              :v-model="currentDentist.name"
            />
            <label for="user">Usuário</label>
            <input
              type="text"
              name="user"
              id="user"
              :disabled="!edit"
              :value="currentDentist.user"
              :v-model="currentDentist.user"
            />
            <div class="buttons">
              <button v-if="edit" @click.prevent="saveDentist">Salvar</button>
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
            <p>{{ currentDentist.name }}</p>
          </div>
          <form action="/usuarios">
            <div class="duo">
              <div>
                <label for="nome">Especialidade</label>
                <input type="text" name="especialidade" id="especialidade" />
              </div>
              <button @click.prevent>Adicionar</button>
            </div>
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
                  v-for="specialty in currentDentist.specialties"
                  :key="specialty.id"
                >
                  <td>{{ specialty.specialty }}</td>
                  <td class="icon">
                    <img
                      @click="deleteDentist(specialty.id)"
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
            <h2>Especialidades</h2>
            <p>{{ currentDentist.name }}</p>
          </div>
          <form action="/usuarios">
            <div class="duo">
              <div>
                <label for="dia">Dia</label>
                <input type="text" name="dia" id="dia" />
              </div>
              <div>
                <label for="inicio">Início</label>
                <input type="text" name="inicio" id="inicio" />
              </div>
              <div>
                <label for="final">Final</label>
                <input type="text" name="final" id="final" />
              </div>
              <button @click.prevent>Adicionar</button>
            </div>
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
                  v-for="openingHour in currentDentist.openingHours"
                  :key="openingHour.id"
                >
                  <td>{{ openingHour.day }}</td>
                  <td>{{ openingHour.start }}</td>
                  <td>{{ openingHour.end }}</td>
                  <td class="icon">
                    <img
                      @click="deleteDentist(openingHour.id)"
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

export default {
  name: "Dentists",
  components: {
    Search,
  },
  data() {
    return {
      modalView: false,
      modalSpecialty: false,
      modalOpeningHours: false,
      edit: false,
      currentDentist: {
        id: 1,
        active: true,
        name: "Mariana Ribeiro",
        color: "#a55eea",
        user: "mariana_ribeiro@dentalweb.com",
        registration: "123SP",
        cpf: "123.456.789.00",
        birth: "27/02/1998",
        phone: "(18) 99999-9999",
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
      dentists: [
        {
          id: 1,
          active: true,
          name: "Mariana Ribeiro",
          image: "profile.jpg",
          color: "#a55eea",
          user: "mariana_ribeiro@dentalweb.com",
          phone: "(18) 99999-9999",
        },
        {
          id: 2,
          active: false,
          name: "Mariana Ribeiro",
          image: "profile.jpg",
          color: "#fed330",
          user: "mariana_ribeiro@dentalweb.com",
          phone: "(18) 99999-9999",
        },
        {
          id: 3,
          active: true,
          name: "Mariana Ribeiro",
          image: "profile.jpg",
          color: "#fc5c65",
          user: "mariana_ribeiro@dentalweb.com",
          phone: "(18) 99999-9999",
        },
      ],
    };
  },
  methods: {
    deleteDentist(dentist) {
      this.$swal({
        icon: "warning",
        title: "Atenção!",
        text: `Excluir o usuário "${dentist}"?`,
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
    viewDentist() {
      this.modalView = !this.modalView;
      this.edit = false;
    },
    editDentist() {
      this.modalView = !this.modalView;
      this.edit = true;
    },
    saveDentist() {
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

<style lang="scss" scoped></style>

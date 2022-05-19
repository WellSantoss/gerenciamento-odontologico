<template>
  <div id="app">
    <transition mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;600;700&display=swap");
@import "@/style/reset.scss";
@import "@/style/variaveis.scss";

body,
input,
select,
button,
textarea {
  font-family: "Open Sans", sans-serif;
  font-size: 1rem;
  color: $black;
}

body {
  background: $gray-100;

  &.hidden {
    overflow: hidden;
  }
}

* {
  scrollbar-width: auto;
  scrollbar-color: $primary $gray-100;
}

*::-webkit-scrollbar {
  width: 16px;
}

*::-webkit-scrollbar-track {
  background: $gray-100;
}

*::-webkit-scrollbar-thumb {
  background-color: $primary;
  border-radius: 10px;
  border: 3px solid $gray-100;
}

.v-enter,
.v-leave-to {
  opacity: 0;
  transform: translate3d(-32px, 0, 0);
}
.v-enter-active,
.v-leave-active {
  transition: all 0.3s;
}

.modal.v-enter {
  transform: translate3d(0, 0, 0);
}
.modal.v-leave-to {
  transform: translate3d(0, 0, 0);
}

h1 {
  font-size: 1.5rem;
  font-weight: 600;
  display: flex;
  align-items: center;

  &::before {
    content: "";
    display: block;
    width: 5px;
    height: 33px;
    background: $primary;
    margin-right: 16px;
  }
}

h2 {
  font-size: 1.125rem;
  font-weight: 600;
}

h3 {
  font-size: 1rem;
  font-weight: 600;
}

label,
.label {
  display: block;
  color: $gray;
  font-size: 0.75rem;
  margin-bottom: 4px;
}

input,
select,
textarea {
  background: $white;
  border: 1px solid $gray-200;
  color: $gray;
  width: 100%;
  margin-bottom: 16px;
  border-radius: 8px;
  padding: 8px 16px;
  outline: none;
}

textarea {
  resize: none;
}

input:not([type="radio"]):focus,
select:focus {
  border: 1px solid $gray-200;
  box-shadow: 0px 0px 0px 1px $gray-200;
}

button {
  background: $primary;
  color: $white;
  border: none;
  cursor: pointer;
  padding: 9px 16px;
  border-radius: 8px;
  display: block;
  margin: 0 auto;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;

  &:hover {
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
    transform: scale(1.1);
  }

  &:disabled {
    cursor: default;

    &:hover {
      box-shadow: none;
      transform: scale(1);
    }
  }
}

.buttons {
  button {
    display: inline-block;

    & + button {
      margin-left: 16px;
    }
  }

  button.close {
    display: inline-block;
    background: $red;
  }
}

form {
  input[type="radio"] {
    width: auto;
    accent-color: $primary;
  }

  label.radio {
    display: inline-block;
    color: $gray;
    font-size: 1rem;
    margin: 0 16px 0 8px;
  }
}

main {
  display: grid;
  grid-template-columns: 300px repeat(auto-fit, minmax(100px, auto));

  .container {
    padding: 0px 32px;

    .content {
      padding: 32px 0px;
    }
  }
}

.subtitle {
  font-size: 1.125rem;
  font-weight: 600;
}

.table {
  overflow-x: auto;
  width: 100%;

  table {
    overflow-x: auto;
    text-align: left;
    width: 100%;
    border-spacing: 0 16px;

    thead {
      font-weight: 600;
    }

    td {
      color: $gray;
      background-color: $white;
      border-top: 1px solid $gray-200;
      border-bottom: 1px solid $gray-200;
      padding: 16px 0px;

      &:first-child {
        border-left: 1px solid $gray-200;
        border-radius: 8px 0 0 8px;
      }

      &:last-child {
        border-right: 1px solid $gray-200;
        padding-right: 16px;
        border-radius: 0 8px 8px 0;
      }

      &.icon img {
        cursor: pointer;
        width: 20px;
        max-width: inherit;
        margin: 0 auto;
        transition: all 0.3s;

        &:hover {
          transform: scale(1.1);
        }
      }

      &.profile {
        display: flex;
        align-items: center;
        min-width: 150px;

        img {
          width: 28px;
          border-radius: 50%;
          margin-right: 16px;
        }
      }
    }
    th,
    td {
      padding-left: 16px;
    }
  }
}

.modal {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 1020;
  background: $overlay;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;

  p {
    margin-bottom: 32px;
  }

  & > div {
    background: $gray-100;
    width: 80%;
    max-width: 600px;
    border-radius: 8px;
    padding: 32px;
    margin: 64px auto;
    max-height: 80%;
    overflow-y: auto;
  }

  .duo {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;

    & > div {
      width: 100%;
    }
  }

  form {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    justify-items: end;
    align-items: end;

    & > div {
      width: 100%;
    }

    & > button {
      margin: 0;
    }

    input,
    select {
      margin-bottom: 0px;
    }

    .procedimento {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }

    .title {
      margin: 32px 0px 16px;
    }

    .full {
      grid-column: span 2;
    }
  }

  .title {
    border-left: 5px solid $primary;
    padding: 0px 16px;
    margin-bottom: 32px;
  }
}

.cards {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 16px;
  padding-top: 16px;
}

.card {
  background: $white;
  border: 1px solid $gray-200;
  border-radius: 8px;
  padding: 16px 16px 0px;
  cursor: pointer;

  h3 {
    border-bottom: 1px solid $gray-200;
    padding-bottom: 8px;
    margin-bottom: 8px;
  }

  p {
    margin-bottom: 16px;
  }

  span {
    margin-bottom: 0px;
  }

  .title {
    border-bottom: 1px solid $gray-200;
    padding-bottom: 16px;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  h2 {
    border-left: 5px solid $primary;
    padding: 0px 16px;
  }

  .items {
    display: flex;
    align-items: flex-start;
    gap: 32px;
    flex-wrap: wrap;

    p {
      margin: 0;
    }

    span {
      margin-bottom: 8px;
    }

    & > div {
      min-width: 200px;
    }
  }
}

@media screen and (max-width: 991px) {
  main {
    display: block;
  }
}
</style>

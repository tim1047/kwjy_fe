<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-nav-item><b-link to="/">정윤 * 강원 가계부</b-link></b-nav-item>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item><b-link to="accountDtl">가계부 통계</b-link></b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "header",
};
</script>
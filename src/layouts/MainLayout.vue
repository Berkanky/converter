<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated class="bg-secondary text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title align="left">
          Para Birimi Hesaplama
          <q-icon name="paid" size="md" color="white"></q-icon>
        </q-toolbar-title>
        <q-icon name="info" size="md" color="white"></q-icon>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>
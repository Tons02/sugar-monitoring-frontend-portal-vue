<template>
    <v-card>
      <v-layout>
        <v-navigation-drawer
          expand-on-hover
          rail
        >
          <v-list>
            <v-list-item
              prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
              subtitle="sandra_a88@gmailcom"
              title="Sandra Adams"
            ></v-list-item>
          </v-list>
  
          <v-divider></v-divider>
  
          <v-list density="compact" nav>
            <v-list-item prepend-icon="mdi-account-group" title="Users" value="users"></v-list-item>
            <v-list-item prepend-icon="mdi-monitor-edit" title="Daily Monitoring" value="shared"></v-list-item>
            <v-list-item prepend-icon="mdi-star" title="Starred" value="starred"></v-list-item>
          </v-list>
          <template v-slot:append>
            <div class="pa-2 pr-22">
              <v-btn block>
                <v-icon size="large">mdi-logout</v-icon>
              </v-btn>
            </div>
          </template>          
        </v-navigation-drawer>
  
        <v-main style="height: 710px"></v-main>
      </v-layout>
    </v-card>
  </template>
<template>
  <div id="app">
    <nuxt />
    <footer-bar />
  </div>
</template>

<script>
// @ is an alias to /src
import NavBar from '@/components/NavBar'
import AsideMenu from '@/components/AsideMenu'
import FooterBar from '@/components/FooterBar'

export default {
  name: 'LoginLayout',
  components: {
    FooterBar,
    AsideMenu,
    NavBar,
  },
  computed: {
    menu() {
      return [
        'General',
        [
          {
            to: '/',
            icon: 'desktop-mac',
            label: 'Dashboard',
          },
        ],
        [
          {
            to: '/applications',
            icon: 'desktop-mac',
            label: 'Applications',
          },
          {
            to: '/students',
            icon: 'desktop-mac',
            label: 'Students',
          },
          {
            to: '/institutions',
            icon: 'desktop-mac',
            label: 'Institutions',
          },
        ],
        // 'Examples',
        // [
        //   {
        //     to: '/tables',
        //     label: 'Tables',
        //     icon: 'table',
        //     updateMark: true,
        //   },
        //   {
        //     to: '/forms',
        //     label: 'Forms',
        //     icon: 'square-edit-outline',
        //   },
        //   {
        //     to: '/profile',
        //     label: 'Profile',
        //     icon: 'account-circle',
        //   },
        //   {
        //     label: 'Submenus',
        //     subLabel: 'Submenus Example',
        //     icon: 'view-list',
        //     menu: [
        //       {
        //         href: '#void',
        //         label: 'Sub-item One',
        //       },
        //       {
        //         href: '#void',
        //         label: 'Sub-item Two',
        //       },
        //     ],
        //   },
        // ],
        // 'About',
        // [
        //   {
        //     href: 'https://admin-one-nuxt.justboil.me',
        //     label: 'Premium Demo',
        //     icon: 'credit-card',
        //   },
        //   {
        //     href: 'https://justboil.me/bulma-admin-template/one-nuxt',
        //     label: 'About',
        //     icon: 'help-circle',
        //   },
        // ],
      ]
    },
  },
  created() {
    this.$store.commit('user', {
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://avatars.dicebear.com/v2/gridy/John-Doe.svg',
    })
  },

}
</script>

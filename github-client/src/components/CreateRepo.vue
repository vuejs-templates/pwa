<template>
    <v-container  grid-list-md text-xs-center>
      <v-form v-model="valid" ref="form" lazy-validation>
        <v-layout row wrap>
          <v-flex xs4>
            <v-subheader class="subheading">Repository Name</v-subheader>
          </v-flex>
          <v-flex xs12 sm6>
            <v-text-field
              label="Repository name"
              v-model="name"
              :rules="nameRules"
              :counter="50"
              required
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs4>
            <v-subheader class="subheading">Description</v-subheader>
            <v-subheader>(Optional)</v-subheader>
          </v-flex>
          <v-flex xs12 sm6>
            <v-text-field
              name="input-7-1"
              label="Description"
              v-model="description"
              multi-line
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs4>
            <v-subheader class="subheading">Homepage</v-subheader>
          </v-flex>
          <v-flex xs12 sm6>
            <v-text-field
              label="Homepage"
              v-model="homepage"
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs4>
            <v-subheader class="subheading">License</v-subheader>
          </v-flex>
          <v-flex xs12 sm6>
            <v-select
              :items="licenseItems"
              :filter="customFilter"
              v-model="license"
              item-text="name"
              label="Select"
              autocomplete
            ></v-select>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs4>
            <v-subheader class="subheading">.gitignore</v-subheader>
          </v-flex>
          <v-flex xs12 sm6>
            <v-select
              :items="gitignoreItems"
              :filter="customFilter"
              v-model="gitignore"
              item-text="name"
              label="Select"
              autocomplete
            ></v-select>
          </v-flex>
        </v-layout>
        <v-radio-group v-model="radioGroup" color="primary">
          <v-radio
            label="Public"
            value="public"
            color="primary"
          ></v-radio>
          <v-radio
            label="Private"
            value="private"
            color="primary"
          ></v-radio>
        </v-radio-group>
        <v-checkbox color="primary" label="Initiate this repository with a README" v-model="readmeCheckbox"></v-checkbox>
        <v-btn
          @click="submit"
          :disabled="!valid"
        >
          submit
        </v-btn>
        <v-btn @click="clear">clear</v-btn>
      </v-form>
    </v-container>

</template>

<script>
  import axios from 'axios'
  export default {
    name: 'CreateRepo',
    data () {
      return {
        valid: true,
        name: '',
        description: '',
        nameRules: [
          v => !!v || 'Repository name is required'
        ],
        homepage: '',
        select: null,
        items: [
          'Item 1',
          'Item 2',
          'Item 3',
          'Item 4'
        ],
        licenseItems: [],
        license: '',
        gitignoreItems: [],
        gitignore: '',
        checkbox: '',
        radioGroup: 1,
        public: true,
        private: false,
        readmeCheckbox: false
      }
    },
    mounted () {
      var _self = this
      axios.get('http://api.github.com/licenses').then(function (data) {
        var items = data.data
        items.forEach(function (item) {
          _self.licenseItems.push(item)
        })
      })
      axios.get('http://api.github.com/gitignore/templates').then(function (data) {
        var items = data.data
        items.forEach(function (item) {
          _self.gitignoreItems.push(item)
        })
      })
    },
    computed: {
      publicOrPrivate: function () {
        return this.radioGroup === 'private'
      }
    },
    methods: {
      submit () {
        if (this.$refs.form.validate()) {
          // Native form submission is not yet supported
          var _self = this
          var me = _self.gh.getUser()
          me.createRepo({
            name: this.name,
            description: this.description,
            homepage: this.homepage,
            license: this.license.key,
            gitignore: this.gitignore,
            private: this.publicOrPrivate,
            auto_init: this.readmeCheckbox}).then(function (response) {
            if (response.status === 201) {
              _self.$router.push('/repos')
            }
          })
        }
      },
      clear () {
        this.$refs.form.reset()
      }
    }
  }
</script>

<style scoped>

</style>

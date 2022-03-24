<template>
  <div>
    <v-container>
      <v-row class="ml-15">
        <table >
          <tr>
            <th>Base</th>
            <th>Price</th>
            <th>Date</th>
          </tr>
          <tr  v-for="(curr,i) of currencies" :key="i">
            <td>{{curr.base}}</td>
            <td>{{curr.price}}</td>
            <td>{{curr.time}}</td>
          </tr>
        </table>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "index.vue",
  data(){
    return{
      currencies:[],
      base_data:this.$store.state.config.data.base_p
    }
  },
  async mounted(){
    let socket=global.socket;
    await  socket.send( `{
      "method":"subscribe",
      "data":["gate_all@ticker_10s"]
    }`)
      socket.onmessage =(event)=>{
      if(event.data){
        let json_data=JSON.parse(event.data)
        console.log(json_data.data.data)
        this.currencies=json_data.data.data
      }
    }
  },
  destroyed() {
    let socket = global.socket;
    socket.send(`{
      "method": "unsubscribe",
      "data": ["${this.base_p}_all@ticker_10s"]
    }`);
  },
}
</script>

<style scoped>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td, th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}
</style>

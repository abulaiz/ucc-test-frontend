<template>
  <div class="vehicle">
    <v-row v-if="vehicle_option.complete_loaded">
    	<!-- Form for create new Vehicle Block -->
    	<v-col cols="4">
    		<create-vehicle/>
    	</v-col>

    	<!-- List of Vehicle Block -->
    	<v-col cols="8">
    		<list-vehicle 
    		 :engine-displacement-option="vehicle_option.engine_displacement"
    		 :engine-power-option="vehicle_option.engine_power"
    		/>
    	</v-col>    	
    </v-row>
    <v-skeleton-loader
    	v-if="!vehicle_option.complete_loaded"
    	class="mx-auto"
    	type="text"
    ></v-skeleton-loader>    
  </div>
</template>

<script>
import CreateVehicle from "@/components/CreateVehicle.vue"
import ListVehicle from "@/components/ListVehicle.vue"
export default {
    data: () => ({
    	vehicle_option: {
    		engine_displacement: [],
    		engine_power: [],
    		complete_loaded: false
    	}
    }),
	components: {
		CreateVehicle, ListVehicle
	},
	methods: {
		async loadEnginePowerOption(){
			let url = `${this.$api_path}/vehicle/option/engine_power`;
			await this.$axios.get(url).then( response => {
				this.vehicle_option.engine_power = response.data
			})			
		},
		async loadEngineDisplacementOption(){
			let url = `${this.$api_path}/vehicle/option/engine_displacement`;
			await this.$axios.get(url).then( response => {
				this.vehicle_option.engine_displacement = response.data
			})
		}
	},
	async mounted(){
		await this.loadEnginePowerOption();
		await this.loadEngineDisplacementOption();
		this.vehicle_option.complete_loaded = true
	}
}	
</script>
<template>
	<v-card>
		<v-card-text>
	        <v-card-title>
	        	<span class="headline">Register Vehicle</span>
	        </v-card-title>
	        <v-card-text>
				<v-alert type="error" v-if="unexpected_error">
					Somethink wrong, please try again.
				</v-alert>	        	
	            <v-row>
	            	<v-col cols="12">
						<v-text-field
							label="Vehicle Name"
							v-model="input.name"
							class="ma-0 pa-0"
							:error-messages="error.name"	
						></v-text-field>	            		
	            	</v-col>
	            	<v-col cols="12">
						<v-text-field
							label="Vehicle Plat Number"
							v-model="input.plat_number"
							class="ma-0 pa-0"
							:error-messages="error.plat_number"	
						></v-text-field>	            		
	            	</v-col>	     
	            	<v-col cols="12">
				        <v-select
				          :items="engineDisplacementOption"
				          item-text="text"
				          item-value="id"
				          v-model="input.engine_displacement_unit"
				          label="Engine displacement unit"
				          class="ma-0 pa-0"
				        ></v-select>		            		
	            	</v-col>	
	            	<v-col cols="12">
						<v-text-field
							label="Engine displacement value"
							v-model="input.engine_displacement"
							class="ma-0 pa-0"
							type="number"
							:error-messages="error.engine_displacement"	
						></v-text-field>	            		
	            	</v-col>	
	            	<v-col cols="12">
				        <v-select
				          :items="enginePowerOption"
				          item-text="text"
				          item-value="id"
				          v-model="input.engine_power_unit"
				          label="Engine power unit"
				          class="ma-0 pa-0"
				        ></v-select>		            		
	            	</v-col>	
	            	<v-col cols="12">
						<v-text-field
							label="Engine power value"
							v-model="input.engine_power"
							type="number"
							class="ma-0 pa-0"
							:error-messages="error.engine_power"	
						></v-text-field>	            		
	            	</v-col>
	            	<v-col cols="12">
						<v-text-field
							label="Price (IDR)"
							v-model="input.price"
							class="ma-0 pa-0"
							type="number"
							:error-messages="error.price"	
						></v-text-field>	            		
	            	</v-col>	
	            	<v-col cols="12">
						<v-text-field
							label="Location"
							v-model="input.location"
							class="ma-0 pa-0"
							:error-messages="error.location"	
						></v-text-field>	            		
	            	</v-col>		            	            	       	
	            </v-row>
	        </v-card-text>
	        <v-card-actions>
	        	<v-spacer></v-spacer>
				<v-btn :loading="onSubmit"
						 :disabled="onSubmit" 
						 color="blue darken-1" 
						 @click="submit"
						 text>
				Submit</v-btn>
	        </v-card-actions>			
		</v-card-text>
	</v-card>
</template>
<script>
export default {
	data : () => ({
		onSubmit: false,
		input: {}, // property in resetInput()
		error: {}, // property in resetErrorMessage()
		unexpected_error: false
	}),
	props: ['engineDisplacementOption', 'enginePowerOption'],
	methods: {
		submit(){
			let url = `${this.$api_path}/vehicle`

			this.unexpected_error = false
			this.resetErrorMessage()

			this.onSubmit = true
			this.$axios.post(url, this.input).then( response => {
				if(response.data.success){
					this.resetInput()
					this.$emit("onFinishSubmit")
					alert('Success add vehicle')
				} else {
					this.error = response.data.errors;
				}
			}).catch(()=>{
				this.unexpected_error = true
			}).then(()=>{
				this.onSubmit = false
			})
		},
		resetErrorMessage(){
			this.error = {
				name: [],
				plat_number: [],
				engine_displacement: [],
				engine_power: [],
				price: [],
				location: []			
			}
		},
		resetInput(){
			this.input =  {
				name: '',
				plat_number: '',
				engine_displacement: '',
				engine_displacement_unit: this.engineDisplacementOption[0].id,
				engine_power: '',
				engine_power_unit: this.enginePowerOption[0].id,
				price: '',
				location: ''
			};		
		}
	},
	mounted(){
		this.resetErrorMessage();
		this.resetInput();
	}
}
</script>
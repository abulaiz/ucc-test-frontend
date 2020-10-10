<template>
	<v-card>
		<!-- List Option -->
		<v-row style="padding: 10px;">
			<v-col cols="4">
		        <v-select
		          :items="master.engine_displacement"
		          item-text="text"
		          item-value="id"		
		          v-model="option.engine_displacement"
		          label="Engine displacement unit"
		          class="ma-0 pa-0"
		        ></v-select>				
			</v-col>
			<v-col cols="4">
		        <v-select
		          :items="master.engine_power"
		          item-text="text"
		          item-value="id"
		          v-model="option.engine_power"
		          label="Engine Power unit"
		          class="ma-0 pa-0"
		        ></v-select>				
			</v-col>
			<v-col cols="4">
				<v-text-field
					label="Search by plat number, name, or place"
					single-line
					v-model="option.filter"
					append-outer-icon="mdi-magnify"
					class="ma-0 pa-0"	
				></v-text-field>
			</v-col>			
		</v-row>
		<!-- List Content -->
	    <v-list three-line>
			<template v-for="(item, index) in vehicles">
				<v-divider></v-divider>	
				<v-list-item :key="index">
					<v-list-item-content>
						<p class="mb-4">{{ item.name }} ({{ item.plat_number }})</p>
						<p class="mb-2"> 
							<v-icon>mdi-engine</v-icon>
							<span class="ml-3">{{ item.engine_displacement }} {{ item.engine_displacement_unit }}</span>
						</p>
						<p class="mb-2"> 
							<v-icon>mdi-speedometer</v-icon>
							<span class="ml-3">{{ item.engine_power }} {{ item.engine_power_unit }}</span
						</p>
						<p class="mb-2"> 
							<v-icon>mdi-currency-usd</v-icon>
							<span class="ml-3">{{ item.price }} USD</span>
						</p>														
						<p class="mb-2"> 
							<v-icon>mdi-google-maps</v-icon>
							<span class="ml-3">{{ item.location }}</span>
						</p>
					</v-list-item-content>
				</v-list-item>
			</template>
	    </v-list>
	    <!-- Conten Loader Indicator -->
		<template v-if="onLoadData">
		    <v-divider></v-divider>	
		    <v-skeleton-loader
		    	class="mx-auto"
		    	type="article"
		    ></v-skeleton-loader> 				
		</template>    
	</v-card>	
</template>

<script>
export default {
	data: () => ({
		master: {
			engine_displacement: [
				{id: 'default', text: 'As user inputed'}
			],
			engine_power: [
				{id: 'default', text: 'As user inputed'}
			]
		},
		option: {
			engine_displacement: null,
			engine_power: null,
			filter: ''
		},
		nextPaginaton: 1,
		vehicles: [],
		onLoadData: false
	}),
	props: ['engineDisplacementOption', 'enginePowerOption'],
	methods: {
		loadVehicles(fresh = false){
			if(fresh)
				this.nextPaginaton = 1

			if(this.nextPaginaton == null && !this.onLoadData)
				return;

			let option = `engine_displacement=${this.option.engine_displacement}`
			option += `&engine_power=${this.option.engine_power}`
			if(this.option.filter != '')
				option += `&keyword=${this.option.filter}`

			let url = `${this.$api_path}/vehicle?page=${this.nextPaginaton}&${option}`

			this.onLoadData = true;
			this.$axios.get(url).then(response => {
				if(fresh)
					this.vehicles = [];

				for(let i in response.data.data)
					this.vehicles.push(response.data.data[i])

				if(response.data.next_page_url == null)
					this.nextPaginaton = null;
				else
					this.nextPaginaton++;

				this.onLoadData = false;
			})
		},
		watchOption(){
	        this.$watch(e => [
				e.option.engine_displacement, e.option.engine_power, e.option.filter         
	        ], () => {
	        	this.loadVehicles(true)
	        }); 	
		},
		setOptionList(){
			for(let i in this.engineDisplacementOption)
				this.master.engine_displacement.push(this.engineDisplacementOption[i]);
			for(let i in this.enginePowerOption)
				this.master.engine_power.push(this.enginePowerOption[i]);

			this.option.engine_displacement = 'default';
			this.option.engine_power = 'default';								
		},
		watchScrolledWindow(){
		    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
		    	this.loadVehicles()
		    }			
		}
	},
	mounted(){
		this.setOptionList();	

		this.loadVehicles(true)

		this.watchOption()	

		document.getElementsByTagName('body')[0].onscroll = this.watchScrolledWindow
	}
}
</script>
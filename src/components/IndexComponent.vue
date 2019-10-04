<template>
	<div>
		<div class="loading-overlay" :class="{'d-none':loader}">
			<div class="loader"></div>
		</div>
		<div class="bg">
			<div class="logo">
				<img src="assets/face1.jpg" class="profile-picture" width="100px" height="100px" data-toggle="modal" data-target="#modalProfile">
				<p></p>
				<h2 class="username-label">{{user.username}}</h2>
				<h4>Selamat Datang di E-Pokir Kabupaten Asahan</h4>
				<div class="z-desktop">
					<a href="#" class="btn me-btn" v-if="acara.status == 0" @click="mulaiReses()">Mulai Reses</a>
					<a href="#" class="btn me-btn" data-toggle="modal" data-target="#modalKamus" @click="loadKamus()">Lihat Kamus Usulan</a>
					<a href="#" class="btn me-btn" data-toggle="modal" data-target="#modalDataUsulan" v-if="acara.status > 0" @click="loadDataUsulans()">Lihat Data Usulan</a>
					<a href="#" class="btn me-btn" v-if="acara.status > 0">Dokumen</a>
					<a href="#" class="btn me-btn" @click="selesaiReses()" v-if="acara.status == 1">Selesaikan Reses</a>
					<a href="#" class="btn me-btn" v-if="env != 'production' && acara.status == 2" @click="resetData()">Reset</a>
					<a href="#" class="btn me-btn" @click="doLogout()">Log Out</a>
				</div>
				<div class="container z-mobile">
					<div class="row">
						<a href="#" class="col-sm-12 col-md-4 btn me-btn" v-if="acara.status == 0" @click="mulaiReses()">Mulai Reses</a>
						<a href="#" class="col-sm-12 col-md-4 btn me-btn" data-toggle="modal" data-target="#modalKamus" @click="loadKamus()">Lihat Kamus Usulan</a>
						<a href="#" class="col-sm-12 col-md-4 btn me-btn" data-toggle="modal" data-target="#modalDataUsulan" v-if="acara.status > 0" @click="loadDataUsulans()">Lihat Data Usulan</a>
						<a href="#" class="col-sm-12 col-md-4 btn me-btn" v-if="acara.status > 0">Dokumen</a>
						<a href="#" class="col-sm-12 col-md-4 btn me-btn" @click="selesaiReses()" v-if="acara.status == 1">Selesaikan Reses</a>
						<a href="#" class="col-sm-12 col-md-4 btn me-btn" v-if="env != 'production' && acara.status == 2" @click="resetData()">Reset</a>
						<a href="#" class="col-sm-12 col-md-4 btn me-btn" @click="doLogout()">Log Out</a>
					</div>
				</div>
				<br><br>
				<span class="footer">Copyright &copy; BAPPEDA Kabupaten Asahan 2019</span>
			</div>
		</div>

		<!-- Modal Section -->
		<div class="modal fade" id="modalProfile">
			<div class="modal-dialog modal-lg">
				<div class="modal-content no-border-radius">
					<!-- Modal Header -->
					<div class="modal-header">
				        <h4 class="modal-title">Profil</h4>
				        <button type="button" class="close" data-dismiss="modal">&times;</button>
				    </div>

				    <!-- Modal body -->
				    <div class="modal-body">
				    	<div class="row">
				    		<div class="col-sm-12 col-md-6">
				    			<center>
				    			<img src="assets/face1.jpg" class="profile-picture" width="100px" height="100px">
				    			<br><a href="#" style="font-size: 10px;"><i class="fa fa-pencil"></i> Ubah Avatar</a>
				    			<h5 class="username-label">{{user.username}}</h5>
				    			</center>
				    		</div>
				    		<div class="col-sm-12 col-md-6">
				    			<h5>Asal Dapil</h5>
				    			<span>{{dapil.name}}</span>
				    			<br><br>

				    			<h5>Mewakili Kecamatan</h5>
				    			<ul>
				    				<li v-for="kecamatan in dapil.kecamatan">
				    					{{kecamatan.Nm_Kec}}
				    				</li>
				    			</ul>
				    		</div>
				    	</div>
				    </div>

				    <!-- Modal footer -->
				    <div class="modal-footer">
				    	<button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
				    </div>
				</div>
			</div>
		</div>

		<div class="modal fade" id="modalKamus">
			<div class="modal-dialog modal-lg">
				<div class="modal-content no-border-radius">
					<!-- Modal Header -->
					<div class="modal-header">
				        <h4 class="modal-title">Kamus Usulan</h4>
				        <button type="button" class="close" data-dismiss="modal">&times;</button>
				    </div>

				    <!-- Modal body -->
				    <div class="modal-body">
				    	<div class="form-group">
				    		<input type="text" class="form-control" placeholder="Cari.." v-model="keyword" v-on:keyup="loadKamus">
				    	</div>
				    	<p></p>
				    	<div style="max-height:450px;overflow: auto;">
				    	<table class="table table-bordered">
				    		<tr v-for="(kamus,index) in kamusUsulans">
				    			
				    			<td>
				    				{{kamus.nama_kamus}}
				    				<br>
				    				<p style="color: #333;font-size: 12px;">{{kamus.Defenisi_Operasional}}</p>
				    				
				    				Rp. {{kamus.harga_kamus.toLocaleString()}} / {{kamus.Satuan_Ket}}
				    				<br>
				    				<b>{{kamus.SKPD_Ket}}</b>

				    				<br>
				    			</td>
				    			<td v-if="acara.status == 1" align="center" style="vertical-align: middle;">
				    				<button class="btn btn-success" data-toggle="modal" data-target="#modalUsulan" @click="setUsulan(kamus)">Usulkan</button>
				    			</td>
				    		</tr>
				    	</table>
				    	</div>
				    </div>

				    <!-- Modal footer -->
				    <div class="modal-footer">
				    	<button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
				    </div>
				</div>
			</div>
		</div>

		<div class="modal fade" id="modalUsulan">
			<div class="modal-dialog modal-lg">
				<div class="modal-content no-border-radius">
					<!-- Modal Header -->
					<div class="modal-header">
				        <h4 class="modal-title">Form Usulan</h4>
				        <button type="button" class="close" data-dismiss="modal">&times;</button>
				    </div>

				    <!-- Modal body -->
				    <div class="modal-body">
				    	<div v-if="kamusUsulan.nama_kamus">
					    	<h5>Yang akan diusulkan</h5>
					    	<table class="table table-bordered">
					    		<tr>
					    			<td>
					    				{{kamusUsulan.nama_kamus}}
					    				<br>
					    				<p style="color: #333;font-size: 12px;">{{kamusUsulan.Defenisi_Operasional}}</p>
					    				
					    				Rp. {{kamusUsulan.harga_kamus.toLocaleString()}} / {{kamusUsulan.Satuan_Ket}}
					    				<br>
					    				<b>{{kamusUsulan.SKPD_Ket}}</b>

					    				<br>
					    			</td>
					    		</tr>
					    	</table>

					    	<h5>Detail Usulan</h5>
					    	<div class="alert alert-success" role="alert" v-if="usulanSuccessStatus">
								Usulan Berhasil Disimpan
							</div>
							<div class="alert alert-danger" role="alert" v-if="usulanFailStatus">
								Usulan Gagal Disimpan
							</div>
					    	<div class="form-group">
					    		<label>Jumlah / Volume (Rp. {{hargaTotal.toLocaleString()}})</label>
					    		<input type="tel" class="form-control" v-model="usulan.jumlah" @keypress="isNumber($event)">
					    	</div>

					    	<div class="form-group">
					    		<label>Kecamatan</label>
					    		<select class="form-control" v-model="usulan.kecamatan">
					    			<option v-for="kecamatan in dapil.kecamatan" :value="kecamatan.Kd_Kec">{{kecamatan.Nm_Kec}}</option>
					    		</select>
					    	</div>

					    	<div class="form-group">
					    		<label>Detail Lokasi</label>
					    		<textarea class="form-control" v-model="usulan.detail_lokasi"></textarea>
					    	</div>

					    	<div class="form-group">
					    		<label>Permasalahan</label>
					    		<textarea class="form-control" v-model="usulan.permasalahan"></textarea>
					    	</div>

					    	<div class="form-group">
					    		<label>Bidang Pembangunan</label>
					    		<select class="form-control" v-model="usulan.kd_pem">
					    			<option v-for="bidang_pembangunan in bidPembangunan" :value="bidang_pembangunan.Kd_Pem">{{bidang_pembangunan.Bidang_Pembangunan}}</option>
					    		</select>
					    	</div>

					    	<div class="form-group">
					    		<label>Prioritas Pembangunan Daerah</label>
					    		<select class="form-control" v-model="usulan.kd_prioritas">
					    			<option v-for="prioritas_pembangunan in rpjmd" :value="prioritas_pembangunan.Kd_Prioritas_Pembangunan_Kota">{{prioritas_pembangunan.Nm_Prioritas_Pembangunan_Kota}}</option>
					    		</select>
					    	</div>
				    	</div>
				    </div>

				    <!-- Modal footer -->
				    <div class="modal-footer">
				    	<button class="btn btn-primary" @click="sendUsulan()">Usulkan</button>
				    	<button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
				    </div>
				</div>
			</div>
		</div>

		<div class="modal fade" id="modalDataUsulan">
			<div class="modal-dialog modal-lg">
				<div class="modal-content no-border-radius">
					<!-- Modal Header -->
					<div class="modal-header">
				        <h4 class="modal-title">Data Usulan</h4>
				        <button type="button" class="close" data-dismiss="modal">&times;</button>
				    </div>

				    <!-- Modal body -->
				    <div class="modal-body">
				    	<div style="max-height:450px;overflow: auto;">
					    	<table class="table table-bordered">
					    		<tr v-for="data in dataUsulans">
					    			<td>
					    				{{data.usulan.Jenis_Usulan}}
					    				<br>
					    				<p style="color: #333;font-size: 12px;">{{data.usulan.Nm_Permasalahan}}</p>
					    				<p style="color: #333;font-size: 12px;">{{data.usulan.Detail_Lokasi}} - {{data.kecamatan.Nm_Kec}}</p>
					    				
					    				Rp. {{data.usulan.Harga_Total.toLocaleString()}} / {{data.usulan.Jumlah}} {{data.satuan.Uraian}}
					    				<br>
					    				<b>{{data.refSubUnit.Nm_Sub_Unit}}</b>
					    				<br>
					    				<button class="btn btn-success" data-toggle="modal" data-target="#modalRiwayat" @click="tampilRiwayat(data.usulan.id)"><i class="fa fa-history"></i> Riwayat</button>
					    				<button class="btn btn-primary" v-if="acara.status == 1"><i class="fa fa-pencil"></i> Edit</button>
					    				<button class="btn btn-danger" v-if="acara.status == 1"><i class="fa fa-trash"></i> Hapus</button>
					    			</td>
					    		</tr>
					    	</table>
				    	</div>
				    </div>

				    <!-- Modal footer -->
				    <div class="modal-footer">
				    	<button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
				    </div>
				</div>
			</div>
		</div>

		<div class="modal fade" id="modalRiwayat">
			<div class="modal-dialog modal-lg">
				<div class="modal-content no-border-radius">
					<!-- Modal Header -->
					<div class="modal-header">
				        <h4 class="modal-title">Riwayat Usulan</h4>
				        <button type="button" class="close" data-dismiss="modal">&times;</button>
				    </div>

				    <!-- Modal body -->
				    <div class="modal-body">
				    	<div style="max-height:450px;overflow: auto;">
					    	<table class="table table-bordered">
					    		<tr v-for="data in dataRiwayats">
					    			<td>
					    				{{data.usulan.Jenis_Usulan}} ({{data.usulan.Keterangan}})
					    				<br>
					    				<p style="color: #333;font-size: 12px;">{{data.usulan.Nm_Permasalahan}}</p>
					    				<p style="color: #333;font-size: 12px;">{{data.usulan.Detail_Lokasi}} - {{data.kecamatan.Nm_Kec}}</p>
					    				
					    				Rp. {{data.usulan.Harga_Total.toLocaleString()}} / {{data.usulan.Jumlah}} {{data.satuan.Uraian}}
					    				<br>
					    				<b>{{data.refSubUnit.Nm_Sub_Unit}}</b>
					    				<br>
					    			</td>
					    		</tr>
					    	</table>
				    	</div>
				    </div>

				    <!-- Modal footer -->
				    <div class="modal-footer">
				    	<button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
				    </div>
				</div>
			</div>
		</div>

	</div>
</template>

<script>
export default {
	data(){
		return {
			auth:{},
			dataUsulans		:{},
			dataRiwayats	:{},
			kamusUsulans	:{},
			kamusUsulan 	:{},
			bidPembangunan 	:{},
			rpjmd 		 	:{},
			user 			:{},
			acara 			:{},
			dapil 			:{},
			usulan 			:{},
			token 			:'',
			env 			:'',
			role_name 		:'',
			keyword			:'',
			message 		:'',
			loader 			:true,
			loginSuccessStatus 	:0,
			loginFailStatus		:0,
			usulanSuccessStatus	:0,
			usulanFailStatus	:0,
		}
	},
	async created(){
		this.loader = false
		this.env = window.config.getEnv()
		this.token = window.localStorage.getItem('eplanning_pokir_token')
		this.role_name = window.config.getRoleName()
		this.authChecker()
		await this.loadAcara()
		await this.loadBidangPembangunan()
		await this.loadRpjmd()
	},
	methods: {
		authChecker(){
			fetch(window.config.getApiUrl()+'api/auth-checker',{
				method: 'POST',
				body:JSON.stringify({token:this.token,level:this.role_name})
			})
			.then(res => res.json())
			.then(res => {
				if(res.status == 'error')
					location='login.html'
				else
				{
					this.user = res.data
					this.dapil = res.dapil
					this.loader = true
				}
			})
		},
		async mulaiReses(){
			var vm = this
			let response = await fetch(window.config.getApiUrl()+'api/mulai-reses',{
				headers:{
					'Authorization':'Bearer '+this.token
				}
			})
			let data = await response.json()
			if(data.status == 'success')
				vm.loadAcara()
			return data
		},
		resetData(){
			var vm = this
			fetch(window.config.getApiUrl()+'api/reset-reses',{
				headers:{
					'Authorization':'Bearer '+this.token
				},
			})
			.then(res => res.json())
			.then(res => {
				if(res.status == 'success')
					vm.loadAcara()
			})
		},
		selesaiReses(){
			var vm = this
			Swal.fire({
			  title: 'Konfirmasi ?',
			  text: "Apakah anda yakin menyelesaikan reses serta mengirim data usulan ke OPD?",
			  type: 'warning',
			  showCancelButton: true,
			  confirmButtonColor: '#3085d6',
			  cancelButtonColor: '#d33',
			  confirmButtonText: 'Ya, Kirim Usulan!'
			}).then((result) => {
			  if (result.value) {
			    fetch(window.config.getApiUrl()+'api/selesai-reses',{
					headers:{
						'Authorization':'Bearer '+this.token
					},
				})
				.then(res => res.json())
				.then(res => {
					if(res.status == 'success')
						vm.loadAcara()
				})
			  }
			})
		},
		setUsulan(kamus){
			this.usulan = {}
			this.kamusUsulan = kamus
		},
		isNumber: function(evt) {
	    	evt = (evt) ? evt : window.event;
	    	var charCode = (evt.which) ? evt.which : evt.keyCode;
	    	if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
	    		evt.preventDefault();;
	    	} else {
	    		return true;
	    	}
	    },
	    doLogout(){
	    	window.localStorage.removeItem('eplanning_pokir_token')
	    	location='login.html'
	    },
	    async sendUsulan(){
	    	let response = await fetch(window.config.getApiUrl()+'api/simpan-usulan-reses',{
	    		method:'POST',
	    		body:JSON.stringify({token:this.token,usulan:this.usulan,kamusUsulan:this.kamusUsulan})
	    	})

	    	let data = await response.json()
	    	if(data.status == 'success')
	    	{
	    		this.usulan = {}
	    		this.usulanSuccessStatus = 1
	    	}
	    	else
	    	{
	    		this.usulanFailStatus = 1
	    	}

	    	var vm = this
			setTimeout(()=>{
				vm.usulanSuccessStatus = 0
				vm.usulanFailStatus = 0
			},2500)
	    	return data
	    },
		async loadKamus(){
			var param = this.keyword == '' ? '' : '&param='+this.keyword
			let response = await fetch(window.config.getApiUrl()+'api/kamus'+param)
			let data = await response.json()
			this.kamusUsulans = data
			return data
		},
		async loadDataUsulans(){
			let response = await fetch(window.config.getApiUrl()+'api/usulan-reses',{
				headers:{
					'Authorization':'Bearer '+this.token
				}
			})
			let data = await response.json()
			this.dataUsulans = data
			return data
		},
		async tampilRiwayat(id){
			let response = await fetch(window.config.getApiUrl()+'api/riwayat-usulan&id='+id)
			let data = await response.json()
			this.dataRiwayats = data
			return data
		},
		async loadAcara()
		{
			let response = await fetch(window.config.getApiUrl()+'api/acara-reses',{
				headers:{
					'Authorization':'Bearer '+this.token
				}
			})

			let data = await response.json()
			this.acara = data
			return data
		},
		async loadBidangPembangunan()
		{
			await fetch(window.config.getApiUrl()+'api/bidang-pembangunan')
			.then(res=>res.json())
			.then(res => {
				this.bidPembangunan = res
			});
		},
		async loadRpjmd()
		{
			await fetch(window.config.getApiUrl()+'api/rpjmd')
			.then(res=>res.json())
			.then(res => {
				this.rpjmd = res
			});
		}
	},
	computed:{
		hargaTotal: function() {
			if(!this.usulan.jumlah)
				return 0;
			return this.kamusUsulan.harga_kamus * this.usulan.jumlah
		}
	}
}
</script>
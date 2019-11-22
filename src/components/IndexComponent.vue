<template>
	<div>
		<div class="loading-overlay" :class="{'d-none':loader}">
			<div class="loader"></div>
		</div>
		<div class="bg">
			<div class="slideshow">
				<div class="slider" data-bg="assets/asahan.jpg">
					<div class="slideshow-img" style="background-image: url('assets/asahan.jpg');"></div>
				</div>
				<div class="slider" data-bg="assets/asahan1.jpg">
					<div class="slideshow-img" style="background-image: url('assets/asahan1.jpg');"></div>
				</div>
				<div class="slider" data-bg="assets/asahan2.jpg">
					<div class="slideshow-img" style="background-image: url('assets/asahan2.jpg');"></div>
				</div>
				<div class="slider" data-bg="assets/asahan3.jpg">
					<div class="slideshow-img" style="background-image: url('assets/asahan3.jpg');"></div>
				</div>
			</div>
			<div class="dark-overlay"></div>
			<div class="logo">
				<img :src="user.avatar_url ? mediaUrl+'/'+user.avatar_url : 'assets/face1.jpg'" class="profile-picture" width="100px" height="100px" data-toggle="modal" data-target="#modalProfile">
				<p></p>
				<h2 class="username-label">{{kelompok.Nm_Sub_Unit}}</h2>
				<h4>Selamat Datang di Forum Perangkat Daerah Kabupaten Asahan</h4>
				<h4 v-if="acara.status == 1">{{musrenbangTimer}}</h4>
				<div class="z-desktop">
					<a href="#" class="btn me-btn" v-if="acara.status == 0" data-toggle="modal" data-target="#modalMulaiMusrenbang" @click="showModalMulai()">Mulai Forum</a>
					<a href="#" class="btn me-btn" data-toggle="modal" data-target="#modalUsulanMusrenbang" @click="loadUsulanMusrenbang()">Lihat Usulan Musrenbang</a>
					<a href="#" class="btn me-btn" data-toggle="modal" data-target="#modalUsulanPokir" @click="loadUsulanPokir()">Lihat Usulan Pokir</a>
					<a href="#" class="btn me-btn" data-toggle="modal" data-target="#modalDokumen" v-if="acara.status > 0">Dokumen</a>
					<a href="#" class="btn me-btn" @click="selesaiReses()" v-if="acara.status == 1">Selesaikan Forum</a>
					<a href="#" class="btn me-btn" v-if="env != 'production' && acara.status == 2" @click="resetData()">Reset</a>
					<a href="#" class="btn me-btn" @click="doLogout()">Log Out</a>
				</div>
				<div class="container z-mobile">
					<div class="row">
						<a href="#" class="col-sm-12 col-md-4 btn me-btn" v-if="acara.status == 0" data-toggle="modal" data-target="#modalMulaiMusrenbang" @click="showModalMulai()">Mulai Forum</a>
						<a href="#" class="col-sm-12 col-md-4 btn me-btn" data-toggle="modal" data-target="#modalUsulanMusrenbang" @click="loadUsulanMusrenbang()">Lihat Usulan Musrenbang</a>
						<a href="#" class="col-sm-12 col-md-4 btn me-btn" data-toggle="modal" data-target="#modalUsulanPokir" @click="loadUsulanPokir()">Lihat Usulan Pokir</a>
						<a href="#" class="col-sm-12 col-md-4 btn me-btn" data-toggle="modal" data-target="#modalDokumen" v-if="acara.status > 0">Dokumen</a>
						<a href="#" class="col-sm-12 col-md-4 btn me-btn" @click="selesaiReses()" v-if="acara.status == 1">Selesaikan Forum</a>
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
				    			<img :src="user.avatar_url ? mediaUrl+'/'+user.avatar_url : 'assets/face1.jpg'" class="profile-picture" width="100px" height="100px">
				    			<p></p>
				    			<h5 class="username-label">{{user.username}}</h5>
				    			</center>
				    		</div>
				    		<div class="col-sm-12 col-md-6">
				    			<h5>OPD</h5>
				    			<span>{{kelompok.Nm_Sub_Unit}}</span>
				    		</div>
				    	</div>
				    </div>

				    <!-- Modal footer -->
				    <div class="modal-footer">
				    	<div class="upload-btn-wrapper" style="height: 38px;position: relative;display: inline-block;">
				    		<button class="btn btn-primary btn-upload" onclick="$('.fileAvatar').click()">Update Avatar</button>
				    		<input type="file" multiple="" accept='image/*' class="fileAvatar" @change="changeAvatar" style="position: absolute;cursor: pointer;height: 38px;z-index: -1;">
				    	</div>
				    	<button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
				    </div>
				</div>
			</div>
		</div>

		<div class="modal fade" id="modalMulaiMusrenbang">
			<div class="modal-dialog modal-lg">
				<div class="modal-content no-border-radius">
					<!-- Modal Header -->
					<div class="modal-header">
				        <h4 class="modal-title">Mulai Forum</h4>
				        <button type="button" class="close" data-dismiss="modal">&times;</button>
				    </div>

				    <!-- Modal body -->
				    <div class="modal-body">
				    	<div>
					    	<div class="alert alert-success" role="alert" v-if="mulaiStatus">
								Forum OPD Berhasil dimulai!
							</div>
					    	<div class="form-group">
					    		<label>Nama Tempat</label>
				    			<input type="text" class="form-control" v-model="infoMusrenbang.Nama_Tempat" :disabled="acara.status > 0">
				    			<span style="color:red;" :class="{'d-none':!errors.Nama_Tempat}">Nama Tempat tidak boleh kosong!</span>
				    		</div>
				    		<div class="form-group">
				    			<label>Alamat</label>
					   			<textarea class="form-control" v-model="infoMusrenbang.Alamat" :disabled="acara.status > 0"></textarea>
					   			<span style="color:red;" :class="{'d-none':!errors.Alamat}">Alamat tidak boleh kosong!</span>
					   		</div>
					   		<div class="form-group">
					   			<label>Nama Kadis</label>
					    		<input type="text" class="form-control" v-model="infoMusrenbang.Nama_Pejabat" :disabled="acara.status > 0">
					    		<span style="color:red;" :class="{'d-none':!errors.Nama_Pejabat}">Nama Kepala Desa/Lurah tidak boleh kosong!</span>
					    	</div>
				    	</div>
				    </div>

				    <!-- Modal footer -->
				    <div class="modal-footer">
				    	<button type="button" class="btn btn-primary" @click="mulaiMusrenbang()">Mulai</button>
				    	<button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
				    </div>
				</div>
			</div>
		</div>

		<div class="modal fade" id="modalUsulanMusrenbang">
			<div class="modal-dialog modal-lg">
				<div class="modal-content no-border-radius">
					<!-- Modal Header -->
					<div class="modal-header">
				        <h4 class="modal-title">Usulan dari Musrenbang Kecamatan</h4>
				        <button type="button" class="close" data-dismiss="modal">&times;</button>
				    </div>

				    <!-- Modal body -->
				    <div class="modal-body">
				    	<div style="max-height:450px;overflow: auto;">
				    	<a :href="linkCetakUsulanDesa+token" target="_blank" class="btn btn-warning"><i class="fa fa-print"></i> Cetak Rekapitulasi Usulan</a>
				    	<p></p>
				   		<div class="form-group">
				   			<label>Kecamatan</label>
				    		<select class="form-control" @change="changeListUsulanMusrenbang" v-model="filterKecamatan">
				    			<option value="0">- Semua Kecamatan -</option>
				    			<option v-for="kecamatan in kecamatans" :value="kecamatan.Kd_Kec">{{kecamatan.Nm_Kec}}</option>
				    		</select>
				    	</div>

				    	<div class="form-group">
				   			<label>Status Prioritas</label>
				    		<select class="form-control" @change="loadPrioritas" v-model="filterPrioritas">
				    			<option value="0">- Pilih -</option>
				    			<option v-for="status in ['Prioritas','Cadangan']" :value="status">{{status}}</option>
				    		</select>
				    	</div>
				    	<center>
				    		<span v-if="!listUsulanMusrenbang.length"><i>Tidak ada data!</i></span>
				    	</center>
				    	<table class="table table-bordered">
				    		<tr v-for="(data,index) in listUsulanMusrenbang">
				    			<td>
				    				<span class="badge badge-success" v-if="data.usulan.Status_Penerimaan_Skpd == 1">Usulan Di terima OPD</span>
				    				<span class="badge badge-danger" v-if="data.usulan.Status_Penerimaan_Skpd == 3">Usulan Di tolak OPD - {{data.usulan.Alasan_Skpd}}</span>
				    				<span class="badge badge-warning" v-if="(filterPrioritas == 'Prioritas' || filterPrioritas == '0') && data.usulan.Status_Penerimaan_Skpd == 0">Belum Dibahas</span>
				    				<span class="badge badge-warning" v-if="filterPrioritas == 'Cadangan' && data.usulan.Status_Penerimaan_Kecamatan == '0'">Usulan Cadangan</span><br>
				    				{{data.usulan.Jenis_Usulan}}
					    			<p style="color: #333;font-size: 12px;">{{data.usulan.Nm_Permasalahan}}</p>
					    			<p style="color: #333;font-size: 12px;">{{data.usulan.Detail_Lokasi}} - {{data.kecamatan.Nm_Kec}}</p>
					    				
					    				Rp. {{data.usulan.Harga_Total.toLocaleString()}} / {{data.usulan.Jumlah}} {{data.satuan.Uraian}}
					    			<br>
					    			<b>{{data.refSubUnit.Nm_Sub_Unit}}</b>
					    			<br>
					    			<span v-if="data.usulan != undefined && data.usulan.Skor != null">Skor : {{data.usulan.Skor}}</span>
					    			<center>
						    			<button v-if="acara.status == 1 && (filterPrioritas == 'Prioritas' || filterPrioritas == 0) && data.usulan.Status_Penerimaan_Skpd == 0" class="btn btn-sm btn-primary" data-toggle="modal" data-target="#modalSkoring" @click="skoringForum(data)"><i class="fa fa-calculator"></i> Skoring</button>
						    			<button v-if="acara.status == 1 && (filterPrioritas == 'Prioritas' || filterPrioritas == 0) && data.usulan.Status_Penerimaan_Skpd == 0" class="btn btn-sm btn-success" @click="terimaUsulan(data.usulan.id)"><i class="fa fa-check"></i> Terima</button>
						    			<button v-if="acara.status == 1 && (filterPrioritas == 'Prioritas' || filterPrioritas == 0) && data.usulan.Status_Penerimaan_Skpd == 0" class="btn btn-sm btn-danger" data-toggle="modal" data-target="#modalTolak" @click="setTolakUsulan(data.usulan.id)"><i class="fa fa-times"></i> Tolak</button>

						    			<button v-if="acara.status == 1 && filterPrioritas == 'Cadangan'" class="btn btn-sm btn-success" @click="terimaUsulanCadangan(data.usulan.id)"><i class="fa fa-check"></i> Terima</button>
						    			<button class="btn btn-sm btn-secondary" data-toggle="modal" data-target="#modalRiwayat" @click="tampilRiwayat(data.usulan.id)"><i class="fa fa-history"></i> Riwayat</button>
						    			<button class="btn btn-sm btn-warning" data-toggle="modal" data-target="#modalBerkas" @click="loadBerkas(data.usulan.id)"><i class="fa fa-file"></i> Berkas</button>
					    			</center>
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

		<div class="modal fade" id="modalUsulanPokir">
			<div class="modal-dialog modal-lg">
				<div class="modal-content no-border-radius">
					<!-- Modal Header -->
					<div class="modal-header">
				        <h4 class="modal-title">Usulan dari Pokir DPRD</h4>
				        <button type="button" class="close" data-dismiss="modal">&times;</button>
				    </div>

				    <!-- Modal body -->
				    <div class="modal-body">
				    	<div style="max-height:450px;overflow: auto;">
				    	<a :href="linkCetakUsulan+token" target="_blank" class="btn btn-warning"><i class="fa fa-print"></i> Cetak Rekapitulasi Usulan</a>
				    	<p></p>
				   		<div class="form-group">
				   			<label>Anggota Dewan</label>
				    		<select class="form-control" @change="changeListUsulanPokir" v-model="filterPokir">
				    			<option value="0">- Semua Dewan -</option>
				    			<option v-for="dewan in dewans" :value="dewan.user.id">{{dewan.data.Nm_Dewan}}</option>
				    		</select>
				    	</div>
				    	<center>
				    		<span v-if="!listUsulanPokir.length"><i>Tidak ada data!</i></span>
				    	</center>
				    	<p></p>
				    	<table class="table table-bordered">
				    		<tr v-for="(data,index) in listUsulanPokir">
				    			
				    			<td>
				    				<span class="badge badge-success" v-if="data.usulan.Status_Penerimaan_Skpd == 1">Usulan Di terima OPD</span>
				    				<span class="badge badge-danger" v-if="data.usulan.Status_Penerimaan_Skpd == 3">Usulan Di tolak OPD - {{data.usulan.Alasan_Skpd}}</span><br>
				    				{{data.usulan.Jenis_Usulan}}
					    			<p style="color: #333;font-size: 12px;">{{data.usulan.Nm_Permasalahan}}</p>
					    			<p style="color: #333;font-size: 12px;">{{data.usulan.Detail_Lokasi}} - {{data.kecamatan.Nm_Kec}}</p>
					    				
					    				Rp. {{data.usulan.Harga_Total.toLocaleString()}} / {{data.usulan.Jumlah}} {{data.satuan.Uraian}}
					    			<br>
					    			<b>{{data.refSubUnit.Nm_Sub_Unit}}</b>
					    			<br>
					    			<span v-if="data.usulan != undefined && data.usulan.Skor != null">Skor : {{data.usulan.Skor}}</span>
					    			<center>
						    			<button v-if="acara.status != 0 && data.usulan.Status_Penerimaan_Skpd == 0" class="btn btn-sm btn-primary" data-toggle="modal" data-target="#modalSkoring" @click="skoringForum(data)"><i class="fa fa-calculator"></i> Skoring</button>
						    			<button v-if="acara.status == 1 && data.usulan.Status_Penerimaan_Skpd == 0" class="btn btn-sm btn-success" @click="terimaUsulan(data.usulan.id)"><i class="fa fa-check"></i> Terima</button>
						    			<button v-if="acara.status == 1 && data.usulan.Status_Penerimaan_Skpd == 0" class="btn btn-sm btn-danger" data-toggle="modal" data-target="#modalTolak" @click="setTolakUsulan(data.usulan.id)"><i class="fa fa-times"></i> Tolak</button>
						    			<button class="btn btn-sm btn-secondary" data-toggle="modal" data-target="#modalRiwayat" @click="tampilRiwayat(data.usulan.id)"><i class="fa fa-history"></i> Riwayat</button>
						    			<button class="btn btn-sm btn-warning" data-toggle="modal" data-target="#modalBerkas" @click="loadBerkas(data.usulan.id)"><i class="fa fa-file"></i> Berkas</button>
					    			</center>
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

		<div class="modal fade" id="modalBerkas">
			<div class="modal-dialog modal-lg">
				<div class="modal-content no-border-radius">
					<!-- Modal Header -->
					<div class="modal-header">
				        <h4 class="modal-title">Berkas Pendukung</h4>
				        <button type="button" class="close" data-dismiss="modal">&times;</button>
				    </div>


				    <!-- Modal body -->
				    <div class="modal-body">
				    	<div style="max-height:450px;overflow-x: auto;" class="container">
				    		<div class="upload-btn-wrapper" style="width: 100%;height: auto;" v-if="acara.status==1">
				    			<button class="btn btn-primary btn-block btn-upload" @click="openDokumenUpload()"><i class="fa fa-cloud-upload"></i> Upload Berkas</button>
				    			<input type="file" multiple="" @change="initFile" accept='image/*' name="dokumen_file" style="height: 0;" />
				    		</div>

					    	<div class="row" id="lcl_elems_wrapper">
					    		<div class="col-sm-12">
				    				{{uploadingMessage}}
					    		</div>
					    		<div class="col-sm-12" v-if="!berkasUsulans.length">
				    				<i><center>Tidak ada berkas</center></i>
					    		</div>
					    		<div class="col-sm-12 col-md-4" v-for="berkas in berkasUsulans">
					    			<div class="image-float-action-button" v-if="acara.status==1">
					    				<button class="btn btn-danger" @click="deleteMedia(berkas.Kd_Media)"><i class="fa fa-trash"></i></button>
					    			</div>
					    			<a :href="mediaUrl+'/'+berkas.Nm_Media" :title="berkas.Judul_Media" :data-lcl-txt="berkas.Judul_Media" :data-lcl-author="user.username">
						    			<img :src="mediaUrl+'/'+berkas.Nm_Media" width="100%" class="image-border">
						    		</a>
					    		</div>
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

		<div class="modal fade" id="modalBerkasDesa"><div class="modal-dialog modal-lg">
				<div class="modal-content no-border-radius">
					<!-- Modal Header -->
					<div class="modal-header">
				        <h4 class="modal-title">Berkas Pendukung</h4>
				        <button type="button" class="close" data-dismiss="modal">&times;</button>
				    </div>


				    <!-- Modal body -->
				    <div class="modal-body">
				    	<div style="max-height:450px;overflow-x: auto;" class="container">
					    	<div class="row" id="lcl_elems_wrapper">
					    		<div class="col-sm-12">
				    				{{uploadingMessage}}
					    		</div>
					    		<div class="col-sm-12" v-if="!berkasUsulans.length">
				    				<i><center>Tidak ada berkas</center></i>
					    		</div>
					    		<div class="col-sm-12 col-md-4" v-for="berkas in berkasUsulans">
					    			<a :href="mediaUrl+'/'+berkas.Nm_Media" :title="berkas.Judul_Media" :data-lcl-txt="berkas.Judul_Media" :data-lcl-author="user.username">
						    			<img :src="mediaUrl+'/'+berkas.Nm_Media" width="100%" class="image-border">
						    		</a>
					    		</div>
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

		<div class="modal fade" id="modalTolak">
			<div class="modal-dialog modal-lg">
				<div class="modal-content no-border-radius">
					<!-- Modal Header -->
					<div class="modal-header">
				        <h4 class="modal-title">Form Tolak Usulan</h4>
				        <button type="button" class="close" data-dismiss="modal">&times;</button>
				    </div>

				    <!-- Modal body -->
				    <div class="modal-body">
				    	<div>
					    	<h5>Usulan yang akan di tolak</h5>
					    	<table class="table table-bordered" v-if="usulanTolak.usulan != undefined">
					    		<tr>
					    			<td>
						    			{{usulanTolak.usulan.Jenis_Usulan}}
						    			<br>
						    			<p style="color: #333;font-size: 12px;">{{usulanTolak.usulan.Nm_Permasalahan}}</p>
						    			<p style="color: #333;font-size: 12px;">{{usulanTolak.usulan.Detail_Lokasi}} - {{usulanTolak.kecamatan.Nm_Kec}}</p>
						    				
						    				Rp. {{usulanTolak.usulan.Harga_Total.toLocaleString()}} / {{usulanTolak.usulan.Jumlah}} {{usulanTolak.satuan.Uraian}}
						    			<br>
						    			<b>{{usulanTolak.refSubUnit.Nm_Sub_Unit}}</b>
					    			</td>
					    		</tr>
					    	</table>

					    	<div class="alert alert-success" role="alert" v-if="usulanSuccessStatus">
								Usulan Berhasil Ditolak
							</div>
					    	<div class="form-group">
					    		<label>Alasan Penolakan</label>
					    		<textarea class="form-control" v-model="alasan_penolakan"></textarea>
					    	</div>

				    	</div>
				    </div>

				    <!-- Modal footer -->
				    <div class="modal-footer">
				    	<button class="btn btn-primary" @click="tolakUsulan()">Tolak</button>
				    	<button type="button" class="btn btn-danger btn-tolak" data-dismiss="modal">Close</button>
				    </div>
				</div>
			</div>
		</div>

		<div class="modal fade" id="modalDokumen">
			<div class="modal-dialog modal-lg">
				<div class="modal-content no-border-radius">
					<!-- Modal Header -->
					<div class="modal-header">
				        <h4 class="modal-title">Dokumen Kegiatan</h4>
				        <button type="button" class="close" data-dismiss="modal">&times;</button>
				    </div>


				    <!-- Modal body -->
				    <div class="modal-body">
				    	<div style="max-height:450px;overflow-x: auto;" class="container">
				    		<div class="row">
				    			<div class="col-sm-12 col-md-4">
					    			<a :href="linkCetakAbsensi+token" target="_blank" class="btn btn-block btn-success"><i class="fa fa-cloud-download"></i> Unduh Absensi</a>
				    			</div>
				    			<div class="col-sm-12 col-md-4">
				    				<!-- <a v-if="acara.data ? acara.data.Jumlah_Peserta : 0" :href="linkBeritaAcara+token" target="_blank" class="btn btn-block btn-warning"><i class="fa fa-print"></i> Berita Acara</a> -->
					    			<a href="javascript:void(0)" data-toggle="modal" data-target="#modalBeritaAcara" class="btn btn-block btn-warning"><i class="fa fa-print"></i> Berita Acara</a>
				    			</div>
				    			<div class="col-sm-12 col-md-4">
					    			<button class="btn btn-block btn-primary" @click="openFileUpload"><i class="fa fa-cloud-upload"></i> Upload Berkas</button>
				    			</div>
				    		</div>
				    		<div class="upload-btn-wrapper">
				    			<input type="file" name="file_dokumen" multiple="" @change="initFileDokumen" accept='image/*'/>
				    		</div>
				    		<p></p>
					    	<table class="table table-bordered">
					    		<tr v-if="!berkasDokumens.length">
					    			<td><i><center>Tidak ada berkas</center></i></td>
					    		</tr>
					    		<tr v-for="berkas in berkasDokumens">
					    			<td>
					    				<a target="_blank" :href="mediaUrl+'/'+berkas.Media.Nm_Media" :title="berkas.Media.Judul_Media" :data-lcl-txt="berkas.Media.Judul_Media" :data-lcl-author="user.username">
							    			{{berkas.Media.Judul_Media}}
							    		</a>
							    		<br>
							    		<b>{{berkas.Jenis_Dokumen}}</b>
							    		<br>
					    				<a target="_blank" :href="mediaUrl+'/'+berkas.Media.Nm_Media" class="btn btn-success">
					    					<i class="fa fa-download"></i> Download
					    				</a>
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

		<div class="modal fade" id="modalSkoring">
			<div class="modal-dialog modal-lg">
				<div class="modal-content no-border-radius">
					<!-- Modal Header -->
					<div class="modal-header">
				        <h4 class="modal-title">Modal Skoring</h4>
				        <button type="button" class="close" data-dismiss="modal">&times;</button>
				    </div>


				    <!-- Modal body -->
				    <div class="modal-body">
				    		<h5>Usulan yang akan di skor</h5>
					    	<table class="table table-bordered" v-if="usulanForum.usulan != undefined">
					    		<tr>
					    			<td>
						    			{{usulanForum.usulan.Jenis_Usulan}}
						    			<br>
						    			<p style="color: #333;font-size: 12px;">{{usulanForum.usulan.Nm_Permasalahan}}</p>
						    			<p style="color: #333;font-size: 12px;">{{usulanForum.usulan.Detail_Lokasi}} - {{usulanForum.kecamatan.Nm_Kec}}</p>
						    				
						    				Rp. {{usulanForum.usulan.Harga_Total.toLocaleString()}} / {{usulanForum.usulan.Jumlah}} {{usulanForum.satuan.Uraian}}
						    			<br>
						    			<b>{{usulanForum.refSubUnit.Nm_Sub_Unit}}</b>
					    			</td>
					    		</tr>
					    	</table>
				    	<div style="max-height:450px;overflow-x: auto;" class="container">
					    	<table class="table table-bordered">
					    		<tr>
									<td>No.</td>
									<td>Kriteria</td>
									<td>Range</td>
									<td>Pilih</td>
								</tr>
								<tbody v-for="(kriteria,index) in kriteriaSkoring.kriteria" :key="++index">
					    		<tr v-for="(bobot,idx) in kriteria.bobot">
					    			<td v-if="idx == 0">{{index}}</td>
					    			<td v-else>&nbsp;</td>
					    			<td v-if="idx == 0" :key="++idx">
					    				<span v-if="kriteria.kriteria.Kriteria == 'MANFAAT/DAMPAK'">{{kriteria.kriteria.Kriteria}} {{kriteriaSkoring.bidangPembangunan}}</span>
					    				<span v-else>{{kriteria.kriteria.Kriteria}}</span>
					    			</td>
					    			<td v-else>&nbsp;</td>
					    			<td v-if="kriteria.kriteria.Kriteria == 'MANFAAT/DAMPAK'">
					    				{{skor[kriteriaSkoring.Kd_Pem][bobot.Range]}}
					    			</td>
					    			<td v-else>
					    				{{bobot.Range}}
					    			</td>
									<td><input type="radio" v-model="nilaiSkor[kriteria.kriteria.Kd_Kriteria]" :value="bobot.Skor"></td>
								</tr>
								</tbody>
					    	</table>
				    	</div>
				    </div>

				    <!-- Modal footer -->
				    <div class="modal-footer">
				    	<button type="button" class="btn btn-primary" :disabled="!saveSkorBtn" @click="saveSkor()">Simpan Skor</button>
				    	<button type="button" class="btn btn-danger btnSkorClose" data-dismiss="modal">Close</button>
				    </div>
				</div>
			</div>
		</div>

		<div class="modal fade" id="modalBeritaAcara">
			<div class="modal-dialog modal-lg">
				<div class="modal-content no-border-radius">
					<!-- Modal Header -->
					<div class="modal-header">
				        <h4 class="modal-title">Berita Acara</h4>
				        <button type="button" class="close" data-dismiss="modal">&times;</button>
				    </div>

				    <!-- Modal body -->
				    <div class="modal-body" v-if="acara.data != undefined">
				    	<div class="form-group">
				   			<label>Kecamatan</label>
				    		<select class="form-control" v-model="acara.data.Kd_Kec">
				    			<option value="0">- Semua Kecamatan -</option>
				    			<option v-for="kecamatan in kecamatans" :value="kecamatan.Kd_Kec">{{kecamatan.Nm_Kec}}</option>
				    		</select>
				    	</div>
				    	<div class="form-group">
				    		<label>Jumlah Peserta</label>
			    			<input type="text" class="form-control" v-model="acara.data.Jumlah_Peserta">
			    			<span style="color:red;" :class="{'d-none':!errors.Jumlah_Peserta}">Jumlah Peserta tidak boleh kosong!</span>
			    		</div>

			    		<div class="form-group">
				    		<label>Pemateri</label>
			    			<input type="text" class="form-control" v-model="acara.data.Pemateri">
			    			<span style="color:red;" :class="{'d-none':!errors.Pemateri}">Pemateri tidak boleh kosong!</span>
			    		</div>

			    		<div class="form-group">
				    		<label>No. Berita Acara</label>
			    			<input type="text" class="form-control" v-model="acara.data.Nomor_Berita_Acara">
			    			<span style="color:red;" :class="{'d-none':!errors.Nomor_Berita_Acara}">No. Berita Acara tidak boleh kosong!</span>
			    		</div>

			    		<div class="form-group">
				    		<label>Tanggal Berita Acara</label>
			    			<input type="text" class="form-control" v-model="acara.data.Tanggal_Berita_Acara">
			    			<span style="color:red;" :class="{'d-none':!errors.Tanggal_Berita_Acara}">Tanggal Berita Acara tidak boleh kosong!</span>
			    		</div>

			    		<div class="form-group">
				    		<label>Pimpinan Sidang</label>
			    			<input type="text" class="form-control" v-model="acara.data.Pimpinan_Sidang">
			    			<span style="color:red;" :class="{'d-none':!errors.Pimpinan_Sidang}">Pimpinan Sidang tidak boleh kosong!</span>
			    		</div>

			    		<div class="form-group">
				    		<label>Jadwal Forum</label>
			    			<input type="text" class="form-control" v-model="acara.data.Jadwal_Forum">
			    			<span style="color:red;" :class="{'d-none':!errors.Jadwal_Forum}">Jadwal Forum tidak boleh kosong!</span>
			    		</div>
			    		
				    </div>

				    <!-- Modal footer -->
				    <div class="modal-footer">
				    	<button type="button" class="btn btn-primary" @click="cetakBeritaAcara()">Cetak</button>
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
			skor : {
					"1" : { //Infrastruktur
						"1" : "< 10 KK",
						"2" : "10 <= 20 KK",
						"3" : "21 <= 30 KK",
						"4" : "31 <= 40 KK",
						"5" : ">40 KK",
					},
					"2" : { //sosialbudaya
						"1" : "< 20 KK",
						"2" : "20 <= 40 KK",
						"3" : "41 <= 60 KK",
						"4" : "61 <= 80 KK",
						"5" : ">80 KK",
					},
					"3" : { //ekonnomi
						"1" : "< 20 KK",
						"2" : "20 <= 40 KK",
						"3" : "41 <= 60 KK",
						"4" : "61 <= 80 KK",
						"5" : ">80 KK",
					},
					"4" : { //pertanian
						"1" : "< 20 KK",
						"2" : "20 <= 40 KK",
						"3" : "41 <= 60 KK",
						"4" : "61 <= 80 KK",
						"5" : ">80 KK",
					},
					"5" : { //bidang lainnya
						"1" : "< 20 KK",
						"2" : "20 <= 40 KK",
						"3" : "41 <= 60 KK",
						"4" : "61 <= 80 KK",
						"5" : ">80 KK",
					},
			},
			auth:{},
			noUrut 			:0,
			id_usulan		:0,
			canStart		:true,
			modalMulai		:false,
			mulaiStatus		:false,
			musrenbangTimer :0,
			listBeritaAcara	:{},
			kriteriaSkoring	:{},
			listLingkungan	:{},
			listDesa		:{},
			listUsulanMusrenbang	:{},
			listUsulanPokir	:{},
			listAcaraDesa	:{},
			infoMusrenbang	:{},
			berkasUsulans	:{},
			berkasUsulanKecamatans	:{},
			berkasDokumens	:{},
			dataUsulans		:{},
			dataRiwayats	:{},
			usulanDesa		:{},
			usulanTolak		:{},
			usulanForum		:{},
			kamusUsulans	:{},
			kamusUsulan 	:{},
			bidPembangunan 	:{},
			rpjmd 		 	:{},
			user 			:{},
			kelompok		:{
				kecamatan:{}
			},
			acara 			:{},
			usulan 			:{},
			errors 			:{},
			token 			:'',
			env 			:'',
			uploadingMessage:'',
			role_name 		:'',
			keyword			:'',
			message 		:'',
			mediaUrl 		:'',
			kecamatans 		: {}, 
			dewans			: {}, 
			linkCetakUsulanDesa 		:'',
			linkCetakAbsensi 		:'',
			alasan_penolakan 		:'',
			loader 			:true,
			usulanKelLoading:true,
			loginSuccessStatus 	:0,
			loginFailStatus		:0,
			usulanSuccessStatus	:0,
			usulanFailStatus	:0,
			nilaiSkor		: {},
			saveSkorBtn		: false,
			jumlahKriteria 	: 0,
			filterPokir : 0,
			filterKecamatan : 0,
			filterPrioritas : 0,
			jumlahTerjawab	: 0,
			jumlahSkor		: 0,
			countUpFromTimeInterval:'',
		}
	},
	async created(){
		this.loader = false
		this.env = window.config.getEnv()
		this.token = window.localStorage.getItem('forum_opd_token')
		this.role_name = window.config.getRoleName()
		this.mediaUrl = window.config.getMediaUrl()
		this.linkCetakUsulanDesa = window.config.getLinkCetakUsulanDesa()
		this.linkCetakUsulan = window.config.getLinkCetakUsulanPokir()
		this.linkCetakAbsensi = window.config.getLinkCetakAbsensiPokir()
		this.linkBeritaAcara = window.config.getLinkCetakBeritaAcaraPokir()
		await this.authChecker()
		await this.loadAcara()
		// await this.loadBidangPembangunan()
		// await this.loadRpjmd()
		// await this.loadKamus()
		await this.loadBerkasKegiatan()
		await this.loadKecamatans()
		await this.loadDewans()
		this.loader = true
	},
	methods: {
		async authChecker(){
			let response = await fetch(window.config.getApiUrl()+'api/auth-checker',{
				method: 'POST',
				body:JSON.stringify({token:this.token,level:this.role_name})
			})

			let data = await response.json()
			if(data.status == 'error')
				location='login.html'
			else
			{
				this.user = await data.data	
				this.kelompok = data.subUnit
			}
			return data
		},
		async loadKecamatans(){
			let response = await fetch(window.config.getApiUrl()+'api/get-kecamatan',{
				method: 'POST',
				body:JSON.stringify({token:this.token,level:this.role_name})
			})

			let data = await response.json()
			this.kecamatans = await data
			return data
		},
		async loadDewans(){
			let response = await fetch(window.config.getApiUrl()+'api/get-dewan',{
				method: 'POST',
				body:JSON.stringify({token:this.token,level:this.role_name})
			})

			let data = await response.json()
			this.dewans = await data
			return data
		},
		async cetakBeritaAcara(){
			var vm = this
			let response = await fetch(window.config.getApiUrl()+'api/save-berita-acara-opd&token='+this.token,{
				method:'POST',
				body:JSON.stringify(this.acara.data)
			})
			let data = await response.json()
			if(data.status == 'error')
			{
				this.errors = data.data
			}
			if(data.status == 'success')
			{
				vm.loadAcara()
				window.open(this.linkBeritaAcara+this.token)
			}
			return data
		},
		async mulaiMusrenbang(){
			var vm = this
			let response = await fetch(window.config.getApiUrl()+'api/mulai-musrenbang&token='+this.token,{
				method:'POST',
				body:JSON.stringify(this.infoMusrenbang)
			})
			let data = await response.json()
			if(data.status == 'error')
			{
				this.errors = data.data
			}
			if(data.status == 'success')
			{
				vm.loadAcara()
				this.mulaiStatus = true
			}
			return data
		},
		cetakUsulan(){
			location="http://eplanning.asahankab.go.id/simulasiv2/eperencanaan/web/index.php?r=api/cetak-rekapitulasi&token="+this.token
		},
		resetData(){
			var vm = this
			fetch(window.config.getApiUrl()+'api/reset-musrenbang&token='+this.token)
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
			  text: "Apakah anda yakin menyelesaikan forum?",
			  type: 'warning',
			  showCancelButton: true,
			  confirmButtonColor: '#3085d6',
			  cancelButtonColor: '#d33',
			  confirmButtonText: 'Ya, Selesaikan forum!'
			}).then((result) => {
			  if (result.value) {
			    fetch(window.config.getApiUrl()+'api/selesai-musrenbang&token='+this.token)
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
	    	window.localStorage.removeItem('forum_opd_token')
	    	location='login.html'
	    },
	    openFileUpload(){
	    	document.querySelector('input[name=file_dokumen]').click()
	    },
	    openDokumenUpload(){
	    	document.querySelector('input[name=dokumen_file]').click()
	    },
	    async setTolakUsulan(id){
	    	let usulanDesa = await fetch(window.config.getApiUrl()+'api/get-usulan-by-id&id='+id)
			let dataUsulanTolak = await usulanDesa.json()
			this.usulanTolak = dataUsulanTolak
			this.id_usulan = id
			return dataUsulanTolak
	    },
	    async changeListUsulanMusrenbang(){
			this.filterPrioritas = 0
	    	let response = await fetch(window.config.getApiUrl()+'api/get-usulan-musrenbang-kecamatan&Kd_Kec='+this.filterKecamatan+'&token='+this.token)
			let data = await response.json()
			this.listUsulanMusrenbang = data
			return data
	    },
	    tolakUsulan(){
	    	var vm = this
			Swal.fire({
			  title: 'Konfirmasi ?',
			  text: "Apakah anda yakin menolak usulan ini?",
			  type: 'warning',
			  showCancelButton: true,
			  confirmButtonColor: '#3085d6',
			  cancelButtonColor: '#d33',
			  confirmButtonText: 'Ya, Tolak Usulan!'
			}).then((result) => {
			  if (result.value) {
			    fetch(window.config.getApiUrl()+'api/tolak-usulan-forum',{
		    		method:'POST',
		    		body:JSON.stringify({id:vm.id_usulan,token:vm.token,alasan_penolakan:vm.alasan_penolakan})
		    	})
		    	.then(res => res.json())
		    	.then(res => {
		    		if(res.status == 'success')
			    	{
			    		vm.id_usulan = 0
			    		document.querySelector('.btn-tolak').click();
			    		Swal.fire(
						  'Berhasil!',
						  'Usulan berhasil Ditolak!',
						  'success'
						)
			    	}
			    	else
			    	{
			    		Swal.fire(
						  'Gagal!',
						  'Usulan gagal Ditolak!',
						  'fail'
						)
			    	}
			    	vm.loadUsulanMusrenbang()
			    	vm.loadUsulanPokir()
		    	})
			  }
			})
	    	
	    },
	    async sendUsulan(){
	    	let response = await fetch(window.config.getApiUrl()+'api/simpan-usulan-musrenbang',{
	    		method:'POST',
	    		body:JSON.stringify({token:this.token,kelompok:this.kelompok,usulan:this.usulan,kamusUsulan:this.kamusUsulan})
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
	    async updateUsulan(){
	    	let response = await fetch(window.config.getApiUrl()+'api/update-usulan-musrenbang',{
	    		method:'POST',
	    		body:JSON.stringify({id:this.id_usulan,kelompok:this.kelompok,token:this.token,usulan:this.usulan,kamusUsulan:this.kamusUsulan})
	    	})

	    	let data = await response.json()
	    	if(data.status == 'success')
	    	{
	    		this.usulanSuccessStatus = 1
	    	}
	    	else
	    	{
	    		this.usulanFailStatus = 1
	    	}
	    	this.loadDataUsulans()
	    	var vm = this
			setTimeout(()=>{
				vm.usulanSuccessStatus = 0
				vm.usulanFailStatus = 0
			},2500)
	    	return data
	    },
	    async changeAvatar(event){
	    	var file = event.target.files[0]
	    	if(!file)
	    		return
	    	if(this.fileValidation(file))
	    		return;
	    	var formData = new FormData();
	    	formData.append('imgFile',file)
	    	let response = await fetch(window.config.getApiUrl()+'api/change-avatar&token='+this.token,{
	    		method:'POST',
	    		body:formData
	    	})

	    	let data = await response.json()
	    	this.user.avatar_url = data.avatar_url
	    	// this.uploadingMessage = "Berkas berhasil di upload"
	    	// await this.loadBerkas(this.id_usulan)
	    	return data
	    },
	    async initFileDokumen(event){
	    	var vm = this
	    	var files = event.target.files
	    	if(!files)
	    		return
	    	Swal.fire({
			  title: 'Pilih Jenis Dokumen',
			  input: 'select',
			  inputOptions: {
			    'Absensi': 'Absensi',
			    'Berita Acara': 'Berita Acara',
			    'Foto': 'Foto',
			    'Video': 'Video'
			    // 'Pakta Integritas': 'Pakta Integritas',
			},
			inputPlaceholder: '- Pilih -',
			showCancelButton: true,
			  inputValidator: function (value) {
			    return new Promise(function (resolve, reject) {
			      if (value !== '') {
			        resolve();
			      } else {
			        resolve('Jenis berkas harus dipilih');
			      }
			    });
			  }
			}).then(async function (result) {
			  if (result.value) {
			  	var numOfFile = files.length
		    	var formData = new FormData();
		    	for(var i=0;i<numOfFile;i++)
		    	{
		    		formData.append('imageFile[]',files[i])
		    		if(vm.fileValidation(files[i]))
	    				return;
		    	}
		    	let response = await fetch(window.config.getApiUrl()+'api/upload-berkas-kegiatan-musrenbang&token='+vm.token+'&jenis='+result.value,{
		    		method:'POST',
		    		body:formData
		    	})

		    	let data = await response.json()
			    Swal.fire({
			      type: 'success',
			      html: result.value + ' Berhasil di upload'
			    });
			    vm.loadBerkasKegiatan()
			  }
			});
	    },
	    async initFile(event){
	    	var files = event.target.files
	    	if(!files.length)
	    		return
	    	this.uploadingMessage = "Uploading..."
	    	var numOfFile = files.length
	    	var formData = new FormData();
	    	for(var i=0;i<numOfFile;i++)
	    	{
	    		formData.append('imageFile[]',files[i])
	    		if(this.fileValidation(files[i]))
	    			return;
	    	}

	    	let response = await fetch(window.config.getApiUrl()+'api/upload-berkas-musrenbang&token='+this.token+'&id='+this.id_usulan,{
	    		method:'POST',
	    		body:formData
	    	})

	    	let data = await response.json()
	    	this.uploadingMessage = "Berkas berhasil di upload"
	    	await this.loadBerkas(this.id_usulan)
	    	var vm = this
			setTimeout(()=>{
				this.uploadingMessage = ''
			},2500)
	    	return data
	    },
	    async loadBerkas(id){
	    	this.id_usulan = id
	    	let response = await fetch(window.config.getApiUrl()+'api/get-media-forum&id='+id)
			let data = await response.json()
			this.berkasUsulans = data
			return data
	    },
	    async loadBerkasKegiatan(){
	    	let response = await fetch(window.config.getApiUrl()+'api/get-media-kegiatan&token='+this.token)
			let data = await response.json()
			this.berkasDokumens = data
			return data
	    },
	    async loadDesa(){
	    	this.usulanKelLoading = true
	    	let response = await fetch(window.config.getApiUrl()+'api/get-desa&Kd_Prov='+this.kelompok.kecamatan.Kd_Prov+'&Kd_Kab='+this.kelompok.kecamatan.Kd_Kab+'&Kd_Kec='+this.kelompok.kecamatan.Kd_Kec)
			let data = await response.json()
			this.listDesa = data
			this.usulanKelLoading = false
			return data
	    },
	    async loadUsulanMusrenbang(){
	    	let response = await fetch(window.config.getApiUrl()+'api/get-usulan-musrenbang-kecamatan&token='+this.token)
			let data = await response.json()
			this.listUsulanMusrenbang = data
			return data
	    },
	    async loadUsulanMusrenbangCadangan(){
	    	if(this.filterKecamatan)
	    	{
		    	let response = await fetch(window.config.getApiUrl()+'api/get-usulan-musrenbang-kecamatan-cadangan&Kd_Kec='+this.filterKecamatan+'&token='+this.token)
				let data = await response.json()
				this.listUsulanMusrenbang = data
				return data
	    	}

	    	let response = await fetch(window.config.getApiUrl()+'api/get-usulan-musrenbang-kecamatan-cadangan&token='+this.token)
			let data = await response.json()
			this.listUsulanMusrenbang = data
			return data
	    },
	    loadPrioritas(){
	    	if(this.filterPrioritas == 'Prioritas')
	    		if(this.filterKecamatan)
	    			this.changeListUsulanMusrenbang()
	    		else
	    			this.loadUsulanMusrenbang()
	    	else
	    		this.loadUsulanMusrenbangCadangan()
	    },
	    async loadUsulanPokir(){
	    	let response = await fetch(window.config.getApiUrl()+'api/get-usulan-pokir&token='+this.token)
			let data = await response.json()
			this.listUsulanPokir = data
			return data
	    },
	    async changeListUsulanPokir(){
	    	let response = await fetch(window.config.getApiUrl()+'api/get-usulan-pokir&Kd_User='+this.filterPokir+'&token='+this.token)
			let data = await response.json()
			this.listUsulanPokir = data
			return data
	    },
	    deleteUsulan(id){
	    	var vm = this
			Swal.fire({
			  title: 'Konfirmasi ?',
			  text: "Apakah anda yakin menghapus data usulan ini?",
			  type: 'warning',
			  showCancelButton: true,
			  confirmButtonColor: '#3085d6',
			  cancelButtonColor: '#d33',
			  confirmButtonText: 'Ya, Hapus Usulan!'
			}).then((result) => {
			  if (result.value) {
			    fetch(window.config.getApiUrl()+'api/hapus-usulan-musrenbang',{
		    		method:'POST',
		    		body:JSON.stringify({id:id,token:this.token})
		    	})
		    	.then(res => res.json())
		    	.then(res => {
		    		if(res.status == 'success')
			    	{
			    		vm.usulanSuccessStatus = 1
			    	}
			    	else
			    	{
			    		vm.usulanFailStatus = 1
			    	}
			    	vm.loadDataUsulans()
					setTimeout(()=>{
						vm.usulanSuccessStatus = 0
						vm.usulanFailStatus = 0
					},2500)
		    	})
			  }
			})
	    	
	    },
	    kirimUsulan(id){
	    	var vm = this
			Swal.fire({
			  title: 'Konfirmasi ?',
			  text: "Apakah anda yakin meneruskan usulan ini ke tingkat kecamatan?",
			  type: 'warning',
			  showCancelButton: true,
			  confirmButtonColor: '#3085d6',
			  cancelButtonColor: '#d33',
			  confirmButtonText: 'Ya, Teruskan Usulan!'
			}).then((result) => {
			  if (result.value) {
			    fetch(window.config.getApiUrl()+'api/teruskan-usulan-musrenbang',{
		    		method:'POST',
		    		body:JSON.stringify({id:id,token:this.token})
		    	})
		    	.then(res => res.json())
		    	.then(res => {
		    		if(res.status == 'success')
			    	{
			    		Swal.fire(
						  'Berhasil!',
						  'Usulan berhasil di teruskan!',
						  'success'
						)
			    	}
			    	else
			    	{
			    		Swal.fire(
						  'Gagal!',
						  'Usulan gagal di teruskan!',
						  'fail'
						)
			    	}
			    	vm.loadDataUsulans()
		    	})
			  }
			})
	    	
	    },
	    terimaUsulan(id){
	    	var vm = this
			Swal.fire({
			  title: 'Konfirmasi ?',
			  text: "Apakah anda yakin menerima usulan ini?",
			  type: 'warning',
			  showCancelButton: true,
			  confirmButtonColor: '#3085d6',
			  cancelButtonColor: '#d33',
			  confirmButtonText: 'Ya, Terima Usulan!'
			}).then((result) => {
			  if (result.value) {
			    fetch(window.config.getApiUrl()+'api/terima-usulan',{
		    		method:'POST',
		    		body:JSON.stringify({id:id,token:this.token})
		    	})
		    	.then(res => res.json())
		    	.then(res => {
		    		if(res.status == 'success')
			    	{
			    		Swal.fire(
						  'Berhasil!',
						  'Usulan berhasil di terima!',
						  'success'
						)
			    	}
			    	else
			    	{
			    		Swal.fire(
						  'Gagal!',
						  'Usulan gagal di terima!',
						  'fail'
						)
			    	}
			    	vm.loadUsulanPokir()
			    	vm.loadUsulanMusrenbang()
		    	})
			  }
			})
	    	
	    },
	    terimaUsulanCadangan(id){
	    	var vm = this
			Swal.fire({
			  title: 'Konfirmasi ?',
			  text: "Apakah anda yakin menerima usulan cadangan ini?",
			  type: 'warning',
			  showCancelButton: true,
			  confirmButtonColor: '#3085d6',
			  cancelButtonColor: '#d33',
			  confirmButtonText: 'Ya, Terima Usulan!'
			}).then((result) => {
			  if (result.value) {
			    fetch(window.config.getApiUrl()+'api/terima-usulan-cadangan',{
		    		method:'POST',
		    		body:JSON.stringify({id:id,token:this.token})
		    	})
		    	.then(res => res.json())
		    	.then(res => {
		    		if(res.status == 'success')
			    	{
			    		Swal.fire(
						  'Berhasil!',
						  'Usulan berhasil di terima!',
						  'success'
						)
			    	}
			    	else
			    	{
			    		Swal.fire(
						  'Gagal!',
						  'Usulan gagal di terima!',
						  'fail'
						)
			    	}
			    	vm.loadUsulanPokir()
			    	vm.loadUsulanMusrenbang()
			    	vm.loadUsulanMusrenbangCadangan()
		    	})
			  }
			})
	    	
	    },
	    deleteMedia(id){
	    	var vm = this
			Swal.fire({
			  title: 'Konfirmasi ?',
			  text: "Apakah anda yakin menghapus berkas usulan ini?",
			  type: 'warning',
			  showCancelButton: true,
			  confirmButtonColor: '#3085d6',
			  cancelButtonColor: '#d33',
			  confirmButtonText: 'Ya, Hapus Berkas!'
			}).then((result) => {
			  if (result.value) {
			    fetch(window.config.getApiUrl()+'api/hapus-media&id='+id)
		    	.then(res => res.json())
		    	.then(res => {
			    	vm.loadBerkas(vm.id_usulan)
		    	})
			  }
			})
	    	
	    },
	    saveSkor(){
	    	var vm = this
			Swal.fire({
			  title: 'Konfirmasi ?',
			  text: "Apakah anda yakin menyimpan skor ini?",
			  type: 'warning',
			  showCancelButton: true,
			  confirmButtonColor: '#3085d6',
			  cancelButtonColor: '#d33',
			  confirmButtonText: 'Ya, Simpan Skor!'
			}).then((result) => {
			  if (result.value) {
			    fetch(window.config.getApiUrl()+'api/save-skor&status=1',{
		    		method:'POST',
		    		body:JSON.stringify({id:vm.id_usulan,token:vm.token,skor:vm.nilaiSkor})
		    	})
		    	.then(res => res.json())
		    	.then(res => {
		    		if(res.status == 'success')
			    	{
			    		vm.id_usulan = 0
			    		vm.jumlahTerjawab = 0
			    		vm.nilaiSkor = {}
			    		vm.saveSkorBtn = false
			    		document.querySelector('.btnSkorClose').click();
			    		if(res.usulan.Kd_Asal_Usulan == 2 || res.usulan.Kd_Asal_Usulan == 3)
			    			vm.loadUsulanMusrenbang()
			    		else
			    			vm.loadUsulanPokir()
			    		Swal.fire(
						  'Berhasil!',
						  'Skor berhasil Disimpan!',
						  'success'
						)
			    	}
			    	else
			    	{
			    		Swal.fire(
						  'Gagal!',
						  'Skor gagal Disimpan!',
						  'fail'
						)
			    	}
		    	})
			  }
			})
	    	
	    },
	    async skoring(id){
	    	this.nilaiSkor = {}
	    	this.jumlahTerjawab = 0
	    	this.id_usulan = id
	    	let usulanDesa = await fetch(window.config.getApiUrl()+'api/get-usulan-kecamatan-by-id&id='+id)
			let dataUsulanDesa = await usulanDesa.json()
			this.usulanDesa = dataUsulanDesa

	    	let response = await fetch(window.config.getApiUrl()+'api/get-kriteria-kecamatan&id='+id)
			let data = await response.json()
			this.kriteriaSkoring = data
			this.jumlahKriteria = data.kriteria.length
			return data
	    },
	    async skoringForum(usulan){
	    	this.nilaiSkor = {}
	    	this.jumlahTerjawab = 0
			this.usulanForum = usulan

	    	let response = await fetch(window.config.getApiUrl()+'api/get-kriteria-forum&id='+usulan.usulan.id)
			let data = await response.json()
			this.kriteriaSkoring = data
			this.id_usulan = data.id
			this.jumlahKriteria = data.kriteria.length
			return data
	    },
	    async showModalMulai(){
	    	let response = await fetch(window.config.getApiUrl()+'api/get-acara-desa&Kd_Prov='+this.kelompok.kecamatan.Kd_Prov+'&Kd_Kab='+this.kelompok.kecamatan.Kd_Kab+'&Kd_Kec='+this.kelompok.kecamatan.Kd_Kec)
			let data = await response.json()
			var vm = this
			data.forEach(val => {
				if(val.acara == null || val.acara.Waktu_Selesai == 0)
				{
					vm.canStart = false
					return
				}
			})
	    	this.modalMulai = true
	    	this.listAcaraDesa = data
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
			let response = await fetch(window.config.getApiUrl()+'api/usulan-musrenbang&token='+this.token)
			let data = await response.json()
			this.dataUsulans = data
			return data
		},
		async tampilRiwayat(id){
			this.dataRiwayats = {}
			let response = await fetch(window.config.getApiUrl()+'api/riwayat-usulan&id='+id)
			let data = await response.json()
			this.dataRiwayats = data
			return data
		},
		async editUsulan(id){
			this.id_usulan = id
			let response = await fetch(window.config.getApiUrl()+'api/get-usulan&id='+id)
			let data = await response.json()
			this.usulan = data
			this.usulan.Desa = data.desa
			this.listLingkungan = data.listLingkungan
			this.kamusUsulan = this.kamusUsulans.find(o => o.kode_kamus === data.Kd_Kamus_Usulan)
			this.loadRpjmd()
			return data
		},
		async loadAcara()
		{
			let response = await fetch(window.config.getApiUrl()+'api/acara-forum&token='+this.token)
			let data = await response.json()
			this.acara = data
			if(this.acara.status == 1)
			{
				this.countUpFromTime(data.data.Waktu_Mulai*1000)
			}
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
			var kd_pem = this.usulan.kd_pem ? this.usulan.kd_pem : this.usulan.Kd_Pem
			await fetch(window.config.getApiUrl()+'api/rpjmd-by-pembangunan&id='+kd_pem)
			.then(res=>res.json())
			.then(res => {
				this.rpjmd = res
			});
		},
		async loadDusun()
		{
			var desa = this.usulan.desa ? this.usulan.desa : this.usulan.desa
			
			await fetch(window.config.getApiUrl()+'api/get-lingkungan-by-kelurahan&Kd_Prov='+desa.Kd_Prov+'&Kd_Kab='+desa.Kd_Kab+'&Kd_Kec='+desa.Kd_Kec+'&Kd_Kel='+desa.Kd_Kel+'&Kd_Urut='+desa.Kd_Urut)
			.then(res=>res.json())
			.then(res => {
				this.listLingkungan = res
			});
		},
		async loadRpjmdOld()
		{
			await fetch(window.config.getApiUrl()+'api/rpjmd')
			.then(res=>res.json())
			.then(res => {
				this.rpjmd = res
			});
		},
		fileValidation(file, size = 1){
	    	if (file.size > (size * 1024 * 1024)) {
		        event.preventDefault();
		        Swal.fire('Gagal!','File Tidak boleh lebih dari '+size+'MB','warning')
		        return true
		    }

		    return false
	    },
		countUpFromTime(countFrom) {
			var vm = this
		  	countFrom = new Date(countFrom).getTime();
		  	var now = new Date(),
		      countFrom = new Date(countFrom),
		      timeDifference = (now - countFrom);
		    
		  	var secondsInADay = 60 * 60 * 1000 * 24,
		      secondsInAHour = 60 * 60 * 1000;
		    
		  	var days = Math.floor(timeDifference / (secondsInADay) * 1);
		  	var hours = Math.floor((timeDifference % (secondsInADay)) / (secondsInAHour) * 1);
		  	var mins = Math.floor(((timeDifference % (secondsInADay)) % (secondsInAHour)) / (60 * 1000) * 1);
		  	var secs = Math.floor((((timeDifference % (secondsInADay)) % (secondsInAHour)) % (60 * 1000)) / 1000 * 1);

		  	// var idEl = document.getElementById(id);
		  	// idEl.getElementsByClassName('days')[0].innerHTML = days;
		  	// idEl.getElementsByClassName('hours')[0].innerHTML = hours;
		  	// idEl.getElementsByClassName('minutes')[0].innerHTML = mins;
		  	// idEl.getElementsByClassName('seconds')[0].innerHTML = secs;
		  	hours = hours.toString().length == 1 ? "0" + hours : hours
		  	mins = mins.toString().length == 1 ? "0" + mins : mins
		  	secs = secs.toString().length == 1 ? "0" + secs : secs

		  	this.musrenbangTimer = hours+':'+mins+':'+secs

		  	clearTimeout(vm.countUpFromTimeInterval);
		  	vm.countUpFromTimeInterval = setTimeout(function(){ vm.countUpFromTime(countFrom); }, 1000);
		}
	},
	watch:{
		nilaiSkor: function(val){
			this.jumlahTerjawab = Object.keys(val).length
			if(this.jumlahTerjawab == 0)
				return
			if(this.jumlahTerjawab == this.jumlahKriteria)
				this.saveSkorBtn = true

		}
	},
	computed:{
		hargaTotal: function() {
			var harga = 0
			if(this.usulan.jumlah)
				harga = this.kamusUsulan.harga_kamus * this.usulan.jumlah
			if(this.usulan.Jumlah)
				harga = this.kamusUsulan.harga_kamus * this.usulan.Jumlah

			return harga
		}
	}
}
</script>

<style type="text/css">
.upload-btn-wrapper {
  	/*position: relative;*/
  	overflow: hidden;
  	height: 0px;
  	/*display: inline-block;*/
}

.upload-btn-wrapper input[type=file] {
  	/*font-size: 100px;*/
  	/*position: absolute;*/
  	left: 0;
  	top: 0;
  	opacity: 0;
}
.image-float-action-button {
	position: absolute;
}
.image-border {
	border:1px solid #eaeaea;
}
</style>
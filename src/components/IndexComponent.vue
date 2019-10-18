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
				<h2 class="username-label">{{kelompok.kelurahan.Nm_Kel}} - {{kelompok.kecamatan.Nm_Kec}}</h2>
				<h4>Selamat Datang di E-Musrenbang Desa Kabupaten Asahan</h4>
				<h4 v-if="acara.status == 1">{{musrenbangTimer}}</h4>
				<div class="z-desktop">
					<a href="#" class="btn me-btn" v-if="acara.status == 0" data-toggle="modal" data-target="#modalMulaiMusrenbang" @click="showModalMulai()">Mulai Musrenbang</a>
					<a href="#" class="btn me-btn" v-if="acara.status == 0" data-toggle="modal" data-target="#modalKamus" @click="loadKamus()">Lihat Kamus Usulan</a>
					<a href="#" class="btn me-btn" v-if="acara.status == 1" data-toggle="modal" data-target="#modalKamus" @click="loadKamus()">Input Usulan</a>
					<a href="#" class="btn me-btn" data-toggle="modal" data-target="#modalDataUsulan" v-if="acara.status > 0" @click="loadDataUsulans()">Lihat Data Usulan</a>
					<a href="#" class="btn me-btn" data-toggle="modal" data-target="#modalDokumen" v-if="acara.status > 0">Dokumen</a>
					<a href="#" class="btn me-btn" @click="selesaiReses()" v-if="acara.status == 1">Selesaikan Musrenbang</a>
					<a href="#" class="btn me-btn" v-if="env != 'production' && acara.status == 2" @click="resetData()">Reset</a>
					<a href="#" class="btn me-btn" @click="doLogout()">Log Out</a>
				</div>
				<div class="container z-mobile">
					<div class="row">
						<a href="#" class="col-sm-12 col-md-4 btn me-btn" v-if="acara.status == 0" data-toggle="modal" data-target="#modalMulaiMusrenbang" @click="showModalMulai()">Mulai Musrenbang</a>
						<a href="#" class="col-sm-12 col-md-4 btn me-btn" v-if="acara.status == 0" data-toggle="modal" data-target="#modalKamus" @click="loadKamus()">Lihat Kamus Usulan</a>
						<a href="#" class="col-sm-12 col-md-4 btn me-btn" v-if="acara.status == 1" data-toggle="modal" data-target="#modalKamus" @click="loadKamus()">Input Usulan</a>
						<a href="#" class="col-sm-12 col-md-4 btn me-btn" data-toggle="modal" data-target="#modalDataUsulan" v-if="acara.status > 0" @click="loadDataUsulans()">Lihat Data Usulan</a>
						<a href="#" class="col-sm-12 col-md-4 btn me-btn" data-toggle="modal" data-target="#modalDokumen" v-if="acara.status > 0">Dokumen</a>
						<a href="#" class="col-sm-12 col-md-4 btn me-btn" @click="selesaiReses()" v-if="acara.status == 1">Selesaikan Musrenbang</a>
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
				    			<h5>Desa/Kelurahan</h5>
				    			<span>{{kelompok.kelurahan.Nm_Kel}}</span>
				    			<br><br>

				    			<h5>Kecamatan</h5>
				    			<span>{{kelompok.kecamatan.Nm_Kec}}</span>
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
				        <h4 class="modal-title">Mulai Musrenbang</h4>
				        <button type="button" class="close" data-dismiss="modal">&times;</button>
				    </div>

				    <!-- Modal body -->
				    <div class="modal-body">
				    	<div class="alert alert-success" role="alert" v-if="mulaiStatus">
							Musrenbang Berhasil dimulai!
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
				   			<label>Nama Kepala Desa/Lurah</label>
				    		<input type="text" class="form-control" v-model="infoMusrenbang.Nama_Pejabat" :disabled="acara.status > 0">
				    		<span style="color:red;" :class="{'d-none':!errors.Nama_Pejabat}">Nama Kepala Desa/Lurah tidak boleh kosong!</span>
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
					    		<label>Dusun/Lingkungan</label>
					    		<select class="form-control" v-model="usulan.kd_lingkungan" @change="loadRpjmd()">
					    			<option v-for="lingkungan in ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15']" :value="lingkungan">Dusun/Lingkungan {{lingkungan}}</option>
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
					    		<select class="form-control" v-model="usulan.kd_pem" @change="loadRpjmd()">
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
				    		<div class="alert alert-success" role="alert" v-if="usulanSuccessStatus">
								Usulan Berhasil Di Hapus
							</div>
							<div class="alert alert-danger" role="alert" v-if="usulanFailStatus">
								Usulan Gagal Di Hapus
							</div>
							<a v-if="dataUsulans.length" :href="linkCetakUsulan+token" target="_blank" class="btn btn-warning"><i class="fa fa-print"></i> Cetak Usulan</a>
							<p></p>
							<center>
								<i v-if="!dataUsulans.length">Tidak ada Data!</i>
							</center>
					    	<table class="table table-bordered">
					    		<tr v-for="data in dataUsulans">
					    			<td>
					    				<span class="badge badge-warning" v-if="data.usulan.Status_Pembahasan == 0">Usulan Pembahasan Desa</span>
					    				<span class="badge badge-success" v-if="data.usulan.Status_Pembahasan == 1">Usulan Pembahasan Kecamatan</span><br>
					    				{{data.usulan.Jenis_Usulan}}
					    				<br>
					    				<p style="color: #333;font-size: 12px;">{{data.usulan.Nm_Permasalahan}}</p>
					    				<p style="color: #333;font-size: 12px;">{{data.usulan.Detail_Lokasi}} - {{data.kecamatan.Nm_Kec}}</p>
					    				
					    				Rp. {{data.usulan.Harga_Total.toLocaleString()}} / {{data.usulan.Jumlah}} {{data.satuan.Uraian}}
					    				<br>
					    				<b>{{data.refSubUnit.Nm_Sub_Unit}}</b>
					    				<br>
					    				<center>
						    				<button class="btn btn-sm btn-secondary" v-if="acara.status == 1 && data.usulan.Status_Pembahasan == 0" @click="kirimUsulan(data.usulan.Kd_Ta_Musrenbang_Kelurahan)"><i class="fa fa-arrow-right"></i> Teruskan Usulan</button>
						    				<button class="btn btn-sm btn-success" data-toggle="modal" data-target="#modalRiwayat" @click="tampilRiwayat(data.usulan.Kd_Ta_Musrenbang_Kelurahan)"><i class="fa fa-history"></i> Riwayat</button>
						    				<button class="btn btn-sm btn-primary" v-if="acara.status == 1" data-toggle="modal" data-target="#modalEditUsulan" @click="editUsulan(data.usulan.Kd_Ta_Musrenbang_Kelurahan)"><i class="fa fa-pencil"></i> Edit</button>
						    				<button class="btn btn-sm btn-danger" v-if="acara.status == 1" @click="deleteUsulan(data.usulan.Kd_Ta_Musrenbang_Kelurahan)"><i class="fa fa-trash"></i> Hapus</button>
						    				<button class="btn btn-sm btn-warning" data-toggle="modal" data-target="#modalBerkas" @click="loadBerkas(data.usulan.Kd_Ta_Musrenbang_Kelurahan)"><i class="fa fa-file"></i> Berkas</button>
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

		<div class="modal fade" id="modalEditUsulan">
			<div class="modal-dialog modal-lg">
				<div class="modal-content no-border-radius">
					<!-- Modal Header -->
					<div class="modal-header">
				        <h4 class="modal-title">Form Edit Usulan</h4>
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
								Usulan Berhasil Diupdate
							</div>
							<div class="alert alert-danger" role="alert" v-if="usulanFailStatus">
								Usulan Gagal Disimpan
							</div>
					    	<div class="form-group">
					    		<label>Jumlah / Volume (Rp. {{hargaTotal.toLocaleString()}})</label>
					    		<input type="tel" class="form-control" v-model="usulan.Jumlah" @keypress="isNumber($event)">
					    	</div>

					    	<div class="form-group">
					    		<label>Dusun/Lingkungan</label>
					    		<select class="form-control" v-model="usulan.Kd_Lingkungan" @change="loadRpjmd()">
					    			<option v-for="lingkungan in ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15']" :value="lingkungan">Dusun/Lingkungan {{lingkungan}}</option>
					    		</select>
					    	</div>

					    	<div class="form-group">
					    		<label>Detail Lokasi</label>
					    		<textarea class="form-control" v-model="usulan.Detail_Lokasi"></textarea>
					    	</div>

					    	<div class="form-group">
					    		<label>Permasalahan</label>
					    		<textarea class="form-control" v-model="usulan.Nm_Permasalahan"></textarea>
					    	</div>

					    	<div class="form-group">
					    		<label>Bidang Pembangunan</label>
					    		<select class="form-control" v-model="usulan.Kd_Pem" @change="loadRpjmd()">
					    			<option v-for="bidang_pembangunan in bidPembangunan" :value="bidang_pembangunan.Kd_Pem">{{bidang_pembangunan.Bidang_Pembangunan}}</option>
					    		</select>
					    	</div>

					    	<div class="form-group">
					    		<label>Prioritas Pembangunan Daerah</label>
					    		<select class="form-control" v-model="usulan.Kd_Prioritas_Pembangunan_Daerah">
					    			<option v-for="prioritas_pembangunan in rpjmd" :value="prioritas_pembangunan.Kd_Prioritas_Pembangunan_Kota">{{prioritas_pembangunan.Nm_Prioritas_Pembangunan_Kota}}</option>
					    		</select>
					    	</div>
				    	</div>
				    </div>

				    <!-- Modal footer -->
				    <div class="modal-footer">
				    	<button class="btn btn-primary" @click="updateUsulan()">Edit Usulan</button>
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
					    			<a :href="linkBeritaAcara+token" target="_blank" class="btn btn-block btn-warning"><i class="fa fa-print"></i> Berita Acara</a>
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


	</div>
</template>

<script>
export default {
	data(){
		return {
			auth:{},
			id_usulan		:0,
			modalMulai		:false,
			mulaiStatus		:false,
			musrenbangTimer :0,
			infoMusrenbang	:{},
			berkasUsulans	:{},
			berkasDokumens	:{},
			dataUsulans		:{},
			dataRiwayats	:{},
			kamusUsulans	:{},
			kamusUsulan 	:{},
			bidPembangunan 	:{},
			rpjmd 		 	:{},
			user 			:{},
			kelompok		:{
				kelurahan:{},
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
			loader 			:true,
			loginSuccessStatus 	:0,
			loginFailStatus		:0,
			usulanSuccessStatus	:0,
			usulanFailStatus	:0,
			countUpFromTimeInterval:'',
		}
	},
	async created(){
		this.loader = false
		this.env = window.config.getEnv()
		this.token = window.localStorage.getItem('eplanning_pokir_token')
		this.role_name = window.config.getRoleName()
		this.mediaUrl = window.config.getMediaUrl()
		this.linkCetakUsulan = window.config.getLinkCetakUsulanPokir()
		this.linkCetakAbsensi = window.config.getLinkCetakAbsensiPokir()
		this.linkBeritaAcara = window.config.getLinkCetakBeritaAcaraPokir()
		await this.authChecker()
		await this.loadAcara()
		await this.loadBidangPembangunan()
		// await this.loadRpjmd()
		await this.loadKamus()
		await this.loadBerkasKegiatan()
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
				this.kelompok = {kelurahan:data.kelurahan,kecamatan:data.kecamatan}
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
			  text: "Apakah anda yakin menyelesaikan musrenbang?",
			  type: 'warning',
			  showCancelButton: true,
			  confirmButtonColor: '#3085d6',
			  cancelButtonColor: '#d33',
			  confirmButtonText: 'Ya, Selesaikan Musrenbang!'
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
	    	window.localStorage.removeItem('eplanning_pokir_token')
	    	location='login.html'
	    },
	    openFileUpload(){
	    	document.querySelector('input[name=file_dokumen]').click()
	    },
	    openDokumenUpload(){
	    	document.querySelector('input[name=dokumen_file]').click()
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
	    	let response = await fetch(window.config.getApiUrl()+'api/get-media-musrenbang-desa&id='+id)
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
	    showModalMulai(){
	    	this.modalMulai = true
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
			let response = await fetch(window.config.getApiUrl()+'api/riwayat-usulan-musrenbang&id='+id)
			let data = await response.json()
			this.dataRiwayats = data
			return data
		},
		async editUsulan(id){
			this.id_usulan = id
			let response = await fetch(window.config.getApiUrl()+'api/get-usulan-musrenbang&id='+id)
			let data = await response.json()
			this.usulan = data
			this.kamusUsulan = this.kamusUsulans.find(o => o.kode_kamus === data.Kd_Kamus_Usulan)
			this.loadRpjmd()
			return data
		},
		async loadAcara()
		{
			let response = await fetch(window.config.getApiUrl()+'api/acara-musrenbang&token='+this.token)
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
		async loadRpjmdOld()
		{
			await fetch(window.config.getApiUrl()+'api/rpjmd')
			.then(res=>res.json())
			.then(res => {
				this.rpjmd = res
			});
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
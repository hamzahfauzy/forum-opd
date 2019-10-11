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
				<img src="assets/logo.png" style="z-index: 2;position: relative;">
				<h3>E-Pokir Kabupaten Asahan</h3>
				<!-- <h4>Login Form</h4> -->
				<div class="container z-container">
					<div class="row">
						<div class="col-sm-12">
							<div class="form">
								<form method="post" @submit="doLogin" class="z-form">
									<div class="alert alert-danger" role="alert" v-if="loginFailStatus">
										{{message}}
									</div>
									<div class="alert alert-success" role="alert" v-if="loginSuccessStatus">
										{{message}}
									</div>
									<div class="form-group">
										<label class="light"><i class="fa fa-user z-red"></i> Nama Pengguna</label>
										<input type="text" placeholder="Nama Pengguna" class="form-control z-input" v-model="auth.username">
									</div>
									<div class="form-group">
										<label class="light"><i class="fa fa-lock z-red"></i> Kata Sandi</label>
										<input type="password" placeholder="Kata Sandi" class="form-control z-input" v-model="auth.password">
									</div>
									<div class="form-group">
										<button class="btn btn-success btn-block z-btn">Sign In</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
				<span class="footer">Copyright &copy; BAPPEDA Kabupaten Asahan 2019</span>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data(){
		return {
			loader:true,
			token:'',
			role_name:'',
			loginSuccessStatus:0,
			loginFailStatus:0,
			message:'',
			auth:{}
		}
	},
	async created(){
		this.loader = false
		this.token = window.localStorage.getItem('eplanning_pokir_token')
		this.role_name = window.config.getRoleName()
		await this.authChecker()
	},
	methods: {
		async authChecker(){
			await fetch(window.config.getApiUrl()+'api/auth-checker',{
				method: 'POST',
				body:JSON.stringify({token:this.token,level:this.role_name})
			})
			.then(res => res.json())
			.then(res => {
				if(res.status == 'valid')
					location='index.html'
				else
					this.loader = true
			})
		},
		doLogin(event){
			event.preventDefault();
			this.auth.level = this.role_name;
			fetch(window.config.getApiUrl()+'api/login',{
				method: 'POST',
				body:JSON.stringify(this.auth)
			})
			.then(res => res.json())
			.then(res => {
				if(res.status == 'error')
					this.loginFailStatus = 1
				else
				{
					this.loginSuccessStatus = 1
					window.localStorage.setItem('eplanning_pokir_token',res.data.token)
					location='index.html'
				}
				this.message = res.message
			})

			var vm = this
			setTimeout(()=>{
				vm.loginFailStatus = 0
				vm.loginSuccessStatus = 0
			},2500)

			this.message = ''
		}
	}
}
</script>
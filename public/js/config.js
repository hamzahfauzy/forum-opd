var config = {
	getApiUrl: () => {
		return 'http://eplanning.asahankab.go.id/app-2020/eperencanaan/web/index.php?r=';
	},
	getMediaUrl: () => {
		return 'http://eplanning.asahankab.go.id/app-2020/eperencanaan/web/uploads';
	},
	getRoleName: () => {
		return 'Operator_Skpd'
	},
	getLinkCetakUsulanDesa: () => {
		return window.config.getApiUrl() + 'api/cetak-rekapitulasi&token=';
	},
	getLinkCetakUsulanPokir: () => {
		return window.config.getApiUrl() + 'api/cetak-rekapitulasi-forum-pokir&token=';
	},
	getLinkCetakAbsensiPokir: () => {
		return window.config.getApiUrl() + 'api/musrenbang-absensi&token=';
	},
	getLinkCetakBeritaAcaraPokir: () => {
		return window.config.getApiUrl() + 'api/berita-acara&token=';
	},
	getEnv: () => {
		return 'production'
	},
	getAppName: () => {
		return 'Forum OPD'
	}
}

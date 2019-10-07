var config = {
	getApiUrl: () => {
		return 'http://eplanning.asahankab.go.id/simulasiv2/eperencanaan/web/index.php?r=';
	},
	getMediaUrl: () => {
		return 'http://eplanning.asahankab.go.id/simulasiv2/eperencanaan/web/uploads';
	},
	getRoleName: () => {
		return 'Operator_Pokir'
	},
	getLinkCetakUsulanPokir: () => {
		return window.config.getApiUrl() + 'api/cetak-rekapitulasi&token=';
	},
	getLinkCetakAbsensiPokir: () => {
		return window.config.getApiUrl() + 'api/pokir-absensi&token=';
	},
	getLinkCetakBeritaAcaraPokir: () => {
		return window.config.getApiUrl() + 'api/berita-acara&token=';
	},
	getEnv: () => {
		return 'simulasi'
	}
}

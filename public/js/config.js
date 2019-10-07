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
		return 'http://eplanning.asahankab.go.id/simulasiv2/eperencanaan/web/index.php?r=api/cetak-rekapitulasi&token=';
	},
	getEnv: () => {
		return 'simulasi'
	}
}

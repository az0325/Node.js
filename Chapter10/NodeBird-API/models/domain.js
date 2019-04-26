module.exports = (sequelize, DataTypes) => (
    sequelize.define('domain', {
        host: { //localhost
            type: DataTypes.STRING(80),
            allowNull: false, //필수
        },
        type: { //유료, 무료 사용자
            type: DataTypes.STRING(10),
            allowNull: false, //필수
        },
        clientSecret: { //비밀코드
            type: DataTypes.STRING(40),
            allowNull: false, //필수
        }
    }, {
        timestamps: true, //DB 생성, 수정 시간 기록
        paranoid: true, //DB 삭제 기록
        validate: { //데이터 추가 검증
            unknownType() {
                console.log(this.type, this.type !== 'free', this.type !== 'premium');
                if(this.type !== 'free' && this.type !== 'premium'){
                    throw new Error('type 컬럼은 free이거나 premium이어야 합니다.');
                }
            }
        },
    })
);
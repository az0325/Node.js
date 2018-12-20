module.exports = ((sequelize, DataTypes) => {
    return sequelize.define('user', {
        name: {
            type: DataTypes.STRING(20),
            allowNull : false, //null이 안되게
            unique : true, //고유한 값
        },
        age: {
            type : DataTypes.INTEGER.UNSIGNED, // UNSIGNED : 음수 불가
            allowNull : false,
        },
        married: {
            type : DataTypes.BOOLEAN,
            allowNull : false,
        },
        comment: {
            type : DataTypes.TEXT,
            allowNull : true, //입력 안해도 됨
        },
        created_at: { //시간
            type : DataTypes.DATE,
            allowNull : false,
            defaultValue : sequelize.literal('now()'), //자동으로 날짜 생성
        },
    },
        {
            timestamps: false,
            underscored: true, // _ 사용
        });
});

//users Table
//이름, 나이, 결혼여부, 댓글, 생성일

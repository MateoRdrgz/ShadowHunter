import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import { User } from './user.model';

interface GameAttributes {
    id: number;
    player_white_id: number|undefined;
    player_black_id: number|undefined;
    is_public: boolean;
    game_state: { [key: string]: { [key: string]: string } };
    is_finished: boolean;
    winner_id: number | null;
    created_at: Date;
    finished_at?: Date;
    turn_count: number;
}

interface GameCreationAttributes extends Optional<GameAttributes, 'id'> {}

class Game extends Model<GameAttributes, GameCreationAttributes> implements GameAttributes {
    public is_public!: boolean;
    public game_state!: { [key: string]: { [key: string]: string } };
    public is_finished!: boolean;
    public winner_id!: number | null;
    public finished_at!: Date;
    public id!: number;
    public player_white_id!: number;
    public player_black_id!: number;
    public readonly created_at!: Date;
    public turn_count!: number;
}

Game.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        player_white_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        player_black_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 3,
        },
        is_public: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false,
        },
        game_state: {
            type: DataTypes.JSON,
            allowNull: true,
        },
        is_finished: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        winner_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        finished_at: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        turn_count: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
    },
    {
        sequelize,
        tableName: 'Game',
    }
);

Game.belongsTo(User, { foreignKey: "player_white_id" });
Game.belongsTo(User, { foreignKey: "player_black_id" });
User.hasMany(Game, { sourceKey: "id", foreignKey: "player_white_id" });
User.hasMany(Game, { sourceKey: "id", foreignKey: "player_black_id" });


export default Game;
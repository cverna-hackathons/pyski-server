import { Field, ID, ObjectType } from 'type-graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  BaseEntity,
  OneToMany,
} from 'typeorm';
import { createGrid, Grid } from '../../grid/grid';
import { Match } from './Match';
import { Move } from './Move';
import { Player } from './Player';

@Entity()
@ObjectType()
export class Game extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: string;

  @Field()
  @Column()
  gameIndex!: number;

  @Field()
  @Column()
  playerIndex!: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  faultOfPlayer?: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  winner?: number;

  @ManyToOne(_ => Match, match => match.games)
  match!: Match;

  @Field(() => [Move])
  @OneToMany(_ => Move, move => move.game)
  moves!: Move[];

  @Field(() => [[ Number ]])
  get grid(): Grid {
    return createGrid(this.match.gridWidth, this.match.gridHeight);
  }

  get firstPlayerIndex(): number {
    return (this.gameIndex % 2);
  }

  get firstPlayerToMove(): Player {
    return (
      this.firstPlayerIndex === 0
        ? this.match.playerA
        : this.match.playerB
    )
  }

  async initFirstMove() {
    const firstMove = Move.create({
      moveIndex: 0,
      game: this,
      player: this.firstPlayerToMove,
    })
    await firstMove.save()
    console.log('initializeFirstMove', this, firstMove);
    return true
  }
}

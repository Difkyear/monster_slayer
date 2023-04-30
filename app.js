function getRandomValue(max, min) {
  return Math.floor(Math.random() * (max - min) + min);
}
const app = Vue.createApp({
  data() {
    return {
      MonsterHealth: 100,
      PlayerHealth: 100,
      currentRound: 0,
      battleLog: [],
      winner: null,
    };
  },
  watch: {
    PlayerHealth(value) {
      if (value < 0 && this.MonsterHealth < 0) {
        this.winner = "draw";
      } else if (value > 0 && this.MonsterHealth < 0) {
        this.winner = "Player";
      }
    },
    MonsterHealth(value) {
      if (value < 0 && this.PlayerHealth < 0) {
        this.winner = "draw";
      } else if (value > 0 && this.playerHealth < 0) {
        this.winner = "Monster";
      }
    },
  },
  computed: {
    playerHealthValue() {
      if (this.PlayerHealth < 0) {
        return { width: "0%" };
      }
      return { width: this.PlayerHealth + "%" };
    },
    monsterHealthValue() {
      if (this.MonsterHealth < 0) {
        return { width: "0%" };
      }
      return { width: this.MonsterHealth + "%" };
    },
    mayUseSpecialAttack() {
      return this.currentRound % 3 != 0;
    },
  },
  methods: {
    restart() {
      (this.MonsterHealth = 100),
        (this.PlayerHealth = 100),
        (this.currentRound = 0),
        (this.winner = null),
        (this.battleLog = []);
    },
    surrender() {
      this.winner = "Monster";
    },
    healMyself() {
      this.currentRound++;
      const value = getRandomValue(22, 15);
      if (this.playerHealth < 100) {
        this.PlayerHealth += value;
      } else {
        this.PlayerHealth = 100;
      }
      this.AttackPlayer();
      this.addbattleLog("player", "heal", value);
    },
    attackMonster() {
      this.currentRound++;
      const value = getRandomValue(12, 5);
      this.MonsterHealth = this.MonsterHealth - value;
      this.AttackPlayer();
      this.addbattleLog("player", "attack", value);
    },
    AttackPlayer() {
      const value = getRandomValue(12, 5);
      this.PlayerHealth = this.PlayerHealth - value;
      this.addbattleLog("monster", "attack", value);
    },
    specialAttack() {
      this.currentRound++;
      const value = getRandomValue(22, 11);
      this.PlayerHealth = this.PlayerHealth - value;
      this.AttackPlayer();
      this.addbattleLog("player", "attack", value);
    },
    addbattleLog(who, what, value) {
      this.battleLog.unshift({
        creatre: who,
        action: what,
        health: value,
      });
    },
  },
});
app.mount("#game");

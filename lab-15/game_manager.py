import random

class GuessGame:
    def __init__(self, player_name):
        self.player_name = player_name
        self.secret_number = random.randint(1, 10)
        self.attempts = 0

    def play(self):
        print(f"\nWelcome, {self.player_name}! Guess a number between 1 and 10.")
        while True:
            try:
                guess = int(input("Your guess: "))
                self.attempts += 1

                if guess == self.secret_number:
                    print(f"🎉 Correct! You guessed it in {self.attempts} attempts.")
                    return self.attempts
                elif guess < self.secret_number:
                    print("📉 Too low. Try again.")
                else:
                    print("📈 Too high. Try again.")
            except ValueError:
                print("⚠ Invalid input! Please enter a number.")

class GameManager:
    def __init__(self, log_file="game_log.txt"):
        self.log_file = log_file

    def log_result(self, player_name, attempts):
        try:
            with open(self.log_file, "a") as file:
                file.write(f"{player_name} guessed the number in {attempts} attempts.\n")
        except IOError:
            print("⚠ Error writing to log file.")

    def launch_game(self):
        try:
            player_name = input("Enter your name: ").strip()
            if not player_name:
                raise ValueError("Name cannot be empty!")

            game = GuessGame(player_name)
            attempts = game.play()
            self.log_result(player_name, attempts)

        except ValueError as ve:
            print(f"⚠ Input Error: {ve}")
        except Exception as e:
            print(f"⚠ Unexpected Error: {e}")
        finally:
            print("🎮 Game session ended.")


if __name__ == "__main__":
    manager = GameManager()
    manager.launch_game()

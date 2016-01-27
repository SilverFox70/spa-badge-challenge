class Person < ActiveRecord::Base
  has_many :votes
  has_many :prizes, foreign_key: :victim_id, class_name: "Badge"
  has_many :badges, through: :votes
  validates :name, presence: true, uniqueness: true

include Helpers

  def vote_up (badge_id)
    current_vote(badge_id, self.id).value = 1
  end

  def vote_down (badge_id)
    current_vote(badge_id, self.id).value = -1
  end

end

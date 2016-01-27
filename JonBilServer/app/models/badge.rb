class Badge < ActiveRecord::Base
  has_many :votes
  has_many :people, through: :votes
  belongs_to :victim, class_name: "Person"
  validates :phrase, presence: true
  validates :phrase, uniqueness: true

include Helpers

  def vote_count
    self.votes.sum(vote_value)
  end

end

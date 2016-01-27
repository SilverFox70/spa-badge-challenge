class Vote < ActiveRecord::Base
  belongs_to :person
  belongs_to :badge
  validates_numericality_of :vote_value, greater_than: -2
  validates_numericality_of :vote_value, less_than: 2

include Helpers

end

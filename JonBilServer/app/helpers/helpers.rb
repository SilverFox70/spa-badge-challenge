module Helpers

  def current_vote(badge_id, person_id)
    # Vote.where(badge_id: badge_id).find_by_person_id(person_id) ||= Vote.new
  end

end

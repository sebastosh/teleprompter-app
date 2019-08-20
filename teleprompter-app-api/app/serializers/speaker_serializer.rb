class SpeakerSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :scripts
  # has_many :scripts
end
